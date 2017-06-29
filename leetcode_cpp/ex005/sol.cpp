#include <iostream>
#include <string>

using namespace std;

class Solution
{
public:
  string longestPalindrome(string s)
  {
    string aux;
    int l;
    int i;

    i = 1;
    l = s.size();
    while(i <= l)
      {
	aux.append(s, l-i, 1);
	i++;
      }
    return aux;
  }
};

int main()
{
  string y = "mopa";
  string x;
  Solution s;

  x = s.longestPalindrome(y);
  cout << x << endl;

  return (0);
}
