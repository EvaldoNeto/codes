#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

class Solution
{
public:
  vector<int> twoSum(vector<int>& nums, int target)
  {
    int n = nums.size();
    vector<int> res;
    unordered_map<int, int> mp;

    for(int i = 0; i < n; i++)
      {
	if (mp.find(target - nums[i]) != mp.end())
	  {
	    res.push_back(mp[target - nums[i]]);
	    res.push_back(i);
	  }   
	mp[nums[i]] = i;
      }
    return res;
  }
};
  
int main()
{
  vector<int> nums = {3, 2, 4};
  int target;
  Solution A;
  
  target = 6;

  vector<int> res = A.twoSum(nums, target);
  
  for(int n : res)
    {
      cout << n << endl;
    }
  return (0);
}
