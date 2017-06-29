#include <iostream>
#include <string>
#include <unordered_map>

using namespace std;

class Solution
{
public:

  int lengtOfLongestSubstring(string s)
  {
    int max;
    int i;
    int l;
    int counter;
    int j;
    unordered_map<char, int> aux;

    j = 0;
    i = 1;
    l = s.size();
    max = (l? 1 : 0);
    counter = 0;
    while(counter < l)
      {
	while(j < i)
	  {
	    aux[s[counter + j]] = j;
	    j++;
	  }

	cout << counter << " : " << i << " : " << s[counter + i] << " : ";
	for(auto& x:aux)
	  cout << x.first;
	cout << endl;
	
	if(aux.find(s[counter + i]) == aux.end() && s[counter + i])
	  {
	    i++;
	    max = (max > i) ? max : (i);
	    if(!s[counter+i])
	      return (max);
	  }
	else
	  {
	    aux.clear();
	    j = 0;
	    counter++;
	    i = 1;
	    if(!s[i])
	      return (max);
	  }
      }
    return (max);
  }
};

int main()
{
  string tmp;
  Solution sol;
  int res;
  string aux;

  tmp = "aa";

  res = sol.lengtOfLongestSubstring(tmp);
  cout << res << endl;
  return (0);
}
