#include <bits/stdc++.h>

using namespace std;

int main()
{
    set<string> officialWordList;
    ifstream indata;
    indata.open("input/wordle-5-letter-words.txt");
    assert(indata);
    string s;
    indata >> s;
    while (!indata.eof())
    {
        officialWordList.insert(s);
        indata >> s;
    }
    indata.close();
    indata.open("compressed_output/wordle-analyzer-result.json");
    assert(indata);
    ofstream outdata;
    outdata.open("compressed_output/official-wordle-analyzer-result.json");
    assert(outdata);
    string ans, initial;
    vector<string> guesses(6);
    indata >> ans;
    while (!indata.eof())
    {
        indata >> initial;
        for (int i = 0; i < 6; i++)
        {
            indata >> guesses[i];
        }
        if (officialWordList.find(ans) != officialWordList.end())
        {
            guesses.erase(remove_if(guesses.begin() + 1,
                                    guesses.end(),
                                    [&officialWordList](string s)
                                    { return officialWordList.find(s) == officialWordList.end(); }),
                          guesses.end());
            while (guesses.size() < 6)
            {
                guesses.push_back("-----");
            }
            outdata << ans << " " << initial << "\n";
            for (auto x : guesses)
            {
                outdata << x << " ";
            }
            outdata << "\n";
        }
        indata >> ans;
    }
}