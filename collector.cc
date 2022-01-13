#include <bits/stdc++.h>

using namespace std;

int main()
{
    ofstream outdata;
    outdata.open("compressed_output/wordle-analyzer-result.json");
    assert(outdata);
    ifstream verdata;
    verdata.open("generated_input/crossed-5-letter-wrds.txt");
    assert(verdata);
    for (int i = 0; i <= 1000; i++)
    {
        cout << i << "\n";
        ifstream indata;
        indata.open("output/wordle-analyzer-result-" + to_string(i) + ".json");
        assert(indata);
        string s, t;
        indata >> s;
        while (!indata.eof())
        {
            assert(s == "{");
            indata >> s;
            assert(s == "\"ans\":");
            indata >> s;
            s = s.substr(1, 5);
            verdata >> t;
            if (verdata.eof())
            {
                cout << "Input over but output still has word " << s << ".\n";
            }
            else if (t != s)
            {
                cout << "Input (" + t + ") output (" + s + ") mismatch.";
            }
            outdata << s << " ";
            indata >> s;
            assert(s == "\"initial\":");
            indata >> s;
            s = s.substr(1, 5);
            verdata >> t;
            if (verdata.eof())
            {
                cout << "Input over but output still has word " << s << ".\n";
            }
            else if (t != s)
            {
                cout << "Input (" + t + ") output (" + s + ") mismatch.";
            }
            outdata << s << "\n";
            indata >> s;
            assert(s == "\"guesses\":");
            indata >> s;
            assert(s == "[");
            vector<string> g;
            indata >> s;
            while (s != "],")
            {
                s = s.substr(1, 5);
                g.push_back(s);
                indata >> s;
            }
            assert(g.size() <= 6);
            while (g.size() < 6)
            {
                g.push_back("-----");
            }
            for (auto x : g)
            {
                outdata << x << " ";
            }
            outdata << "\n";
            indata >> s;
            assert(s == "},");
            indata >> s;
        }
    }
}