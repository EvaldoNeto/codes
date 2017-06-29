#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution
{
public:
  int lengthOfLongestSubstring(string s)
  {
    vector<int> v(256, -1);
    int max;
    int start;

    start = -1;
    max = 0;
    for(int i = 0; i != s.length(); i++)
      {
	if(v[s[i]] > start)
	  start = v[s[i]];
	v[s[i]] = i;
	max = (max > i - start) ? max : i - start;
      }
    return max;
  }
};
		   
