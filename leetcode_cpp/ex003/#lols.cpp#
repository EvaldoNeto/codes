#include <iostream>
#include <string>

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
    string aux;
    
    i = 1;
    l = s.size();
    max = (l? 1 : 0);
    counter = 0;
    while(counter < l)
      {
 	aux = s.substr(counter, i);
	cout << aux << " : " << s[counter + i] << " : " << i << endl;
	if(aux.find(s[counter + i]) == string::npos && s[counter + i])
	  {
	    i++;
	    max = (max > i) ? max : (i);
	    if(!s[counter+i])
	      return (max);
	  }
	else
	  {
	    // if(max > (l - counter)/2)
	    //return max;
	    counter++;
	    i = 1;
	    if(!s[i+1])
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

  tmp = "abcdef";

  res = sol.lengtOfLongestSubstring(tmp);
  cout << res << endl;
  return (0);
}
