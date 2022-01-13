#include <bits/stdc++.h>

using namespace std;

struct Result
{
    long long guesses = 0;
    long long wordscouldguess = 0;
    long long wordscouldnotguess = 0;
    string ans;
};

bool compareResults(Result r1, Result r2)
{
    if (r1.wordscouldguess == r2.wordscouldguess)
    {
        return r1.guesses > r2.guesses;
    }
    return r1.wordscouldguess < r2.wordscouldguess;
}

vector<Result> loadResults()
{
    ifstream indata;
    indata.open("compressed_output/wordle-analyzer-result.json");
    assert(indata);
    map<string, Result> results;
    string ans, initial;
    vector<string> guesses(6);
    indata >> ans;
    while (!indata.eof())
    {
        indata >> initial;
        int needed = 0;
        for (int i = 0; i < 6; i++)
        {
            indata >> guesses[i];
            if (guesses[i] == ans)
            {
                needed = (i + 1);
            }
        }
        results[ans].ans = ans;
        if (needed)
        {
            results[initial].guesses += needed;
            results[initial].wordscouldguess++;
        }
        else
        {
            results[initial].wordscouldnotguess++;
        }
        indata >> ans;
    }
    vector<Result> sorter;
    for (auto x : results)
    {
        sorter.push_back(x.second);
    }
    return sorter;
}

int main()
{
    auto sorter = loadResults();
    sort(sorter.begin(), sorter.end(), compareResults);
    ofstream outdata;
    outdata.open("compressed_output/top-hidden-words.json");
    assert(outdata);
    for (auto x : sorter)
    {
        double avgguesses = x.guesses;
        avgguesses /= x.wordscouldnotguess;
        outdata << x.ans << " " << avgguesses << " " << x.wordscouldguess << " " << x.wordscouldnotguess << "\n";
    }
}