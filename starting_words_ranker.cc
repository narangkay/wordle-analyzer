#include <bits/stdc++.h>

using namespace std;

struct Result
{
    long long guesses = 0;
    long long wordsguessed = 0;
    long long wordsnotguessed = 0;
    long long rankBySuccessRate = 0;
    long long rankByGuessesNeeded = 0;
    string initial;
};

bool compareResults(Result r1, Result r2)
{
    if (r1.wordsguessed == r2.wordsguessed)
    {
        return r1.guesses * r2.wordsguessed < r2.guesses * r1.wordsguessed;
    }
    return r1.wordsguessed > r2.wordsguessed;
}

bool compareResultsByGuessesNeeded(Result r1, Result r2)
{
    if (r1.guesses * r2.wordsguessed == r2.guesses * r1.wordsguessed)
    {
        return r1.wordsguessed > r2.wordsguessed;
    }
    return r1.guesses * r2.wordsguessed < r2.guesses * r1.wordsguessed;
}

bool compareResultsBySuccessRateRank(Result r1, Result r2)
{
    return r1.rankBySuccessRate < r2.rankBySuccessRate;
}

vector<Result> loadResults()
{
    ifstream indata;
    indata.open("compressed_output/official-wordle-analyzer-result.json");
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
        results[initial].initial = initial;
        if (needed)
        {
            results[initial].guesses += needed;
            results[initial].wordsguessed++;
        }
        else
        {
            results[initial].wordsnotguessed++;
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
    long long rank = 0;
    for (auto &x : sorter)
    {
        rank++;
        x.rankBySuccessRate = rank;
    }
    sort(sorter.begin(), sorter.end(), compareResultsByGuessesNeeded);
    rank = 0;
    for (auto &x : sorter)
    {
        rank++;
        x.rankByGuessesNeeded = rank;
    }
    sort(sorter.begin(), sorter.end(), compareResultsBySuccessRateRank);
    ofstream outdata;
    outdata.open("compressed_output/official-top-starting-words.json");
    assert(outdata);
    for (auto x : sorter)
    {
        double avgguesses = x.guesses;
        avgguesses /= x.wordsguessed;
        outdata << x.initial << " " << avgguesses << " " << x.wordsguessed << " " << x.wordsnotguessed << " " << x.rankBySuccessRate << " " << x.rankByGuessesNeeded << "\n";
    }
}