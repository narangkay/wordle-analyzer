#include <bits/stdc++.h>

using namespace std;

int main()
{
    ifstream indata;
    indata.open("input/5-letter-wrds.txt");
    string s;
    vector<string> wrds;
    indata >> s;
    while (!indata.eof())
    {
        wrds.push_back(s);
        indata >> s;
    }
    ofstream outdata;
    outdata.open("generated_input/crossed-5-letter-wrds.txt");
    for (int i = 0; i < wrds.size(); i++)
    {
        for (int j = 0; j < wrds.size(); j++)
        {
            outdata << wrds[i] << " " << wrds[j] << "\n";
        }
    }
}