#include <bits/stdc++.h>

using namespace std;

struct Result
{
    string ans;
    string initial;
    vector<string> guesses;
};

void printstr(ostream &os, string k)
{
    os << "\"" << k << "\"";
}

ostream &operator<<(ostream &os, const vector<string> &r)
{
    os << "[\n";
    for (auto x : r)
    {
        printstr(os, x);
        os << ",\n";
    }
    os << "]";
    return os;
}

void printkv(ostream &os, string k, string v)
{
    printstr(os, k);
    os << ": ";
    printstr(os, v);
    os << ",\n";
}

void printkv(ostream &os, string k, vector<string> v)
{
    printstr(os, k);
    os << ": ";
    os << v;
    os << ",\n";
}

ostream &operator<<(ostream &os, const Result &r)
{
    os << "{\n";
    printkv(os, "ans", r.ans);
    printkv(os, "initial", r.initial);
    printkv(os, "guesses", r.guesses);
    os << "},\n";
    return os;
}

struct Mask
{
    string ans;
    string green_pattern;
    vector<string> yellow_patterns;
    string yellow_letters;
    set<char> black_letters;

    Mask(string res)
    {
        ans = res;
        green_pattern = "?????";
        yellow_letters = "";
    }

    bool appliesto(string word)
    {
        int idx = 0;
        set<char> build; // build a set of letters from the word
        for (char c : word)
        {
            char p = green_pattern[idx];
            if (p == '?')
            {
                auto it = black_letters.find(c);
                bool is_banned = (it != black_letters.end());
                if (is_banned)
                    return false; // wildcard letter is banned
            }
            else if (c != p)
            {
                return false; // word doesn't match acceptable pattern
            }
            idx++;
            build.insert(c); // dups are automatically ignored
        }
        for (char c : yellow_letters)
        {
            if (c != '-')
            {
                auto it = build.find(c);
                bool is_present = (it != build.end());
                if (!is_present)
                    return false; // yellow_letters letter not present
            }
        }
        for (std::string yellow_pattern : yellow_patterns)
        {
            idx = 0;
            for (char c : word)
            {
                char p = yellow_pattern[idx];
                if (c == p)
                    return false; // word matches unacceptable pattern
                idx++;
            }
        }
        string yloptrn = "?????";
        for (int i = 0; i < 5; i++)
        {
            if (word[i] == ans[i])
            {
                green_pattern[i] = word[i];
                continue;
            }
            bool taken = false;
            for (int j = 0; j < 5; j++)
            {
                if (word[j] == ans[j])
                {
                    continue;
                }
                if (word[i] == ans[j])
                {
                    taken = true;
                    break;
                }
            }
            if (taken)
            {
                yloptrn[i] = word[i];
                if (yellow_letters.find(word[i]) == std::string::npos)
                {
                    yellow_letters.push_back(word[i]);
                }
            }
            else
            {
                black_letters.insert(word[i]);
            }
        }
        if (yloptrn != "?????")
        {
            yellow_patterns.push_back(yloptrn);
        }
        return true;
    }
};

vector<string> wrds;

Result process(const string &s1, const string &s2)
{
    Result r;
    r.ans = s1;
    r.initial = s2;
    auto m = Mask(s1);
    m.appliesto(s2);
    r.guesses.push_back(s2);
    if (s1 == s2)
    {
        return r;
    }
    for (auto s : wrds)
    {
        if (r.guesses.size() >= 6 || r.guesses.back() == s1)
        {
            break;
        }
        if (s == s2)
        {
            continue;
        }
        if (m.appliesto(s))
        {
            r.guesses.push_back(s);
        }
    }
    return r;
}

void loadwrds()
{
    ifstream indata;
    indata.open("input/5-letter-wrds.txt");
    if (!indata)
    {
        cerr << "Error: input file could not be opened" << endl;
        exit(1);
    }
    string s;
    indata >> s;
    while (!indata.eof())
    {
        wrds.push_back(s);
        indata >> s;
    }
    random_shuffle(wrds.begin(), wrds.end());
}

int main()
{
    loadwrds();
    ifstream indata;
    indata.open("generated_input/crossed-5-letter-wrds.txt");
    if (!indata)
    {
        cerr << "Error: input file could not be opened" << endl;
        exit(1);
    }
    ofstream outdata;
    string s1, s2;
    long long c = 0;
    long long p = 642;
    chrono::steady_clock::time_point begin = chrono::steady_clock::now();
    do
    {
        indata >> s1 >> s2;
        int newp = (c / (wrds.size() * wrds.size()));
        if (newp > p)
        {
            p = newp;
            cout << p << " " << chrono::duration_cast<chrono::seconds>(chrono::steady_clock::now() - begin).count()
                 << "\n";
            outdata.close();
            outdata.clear();
            outdata.open("output/wordle-analyzer-result-" + to_string(p) + ".json");
            if (!outdata)
            {
                cerr << "Error: output file could not be opened" << endl;
                exit(1);
            }
        }
        c += 1000;
        if (!outdata)
        {
            continue;
        }
        outdata << process(s1, s2);
    } while (!indata.eof());
    cout << c;
}