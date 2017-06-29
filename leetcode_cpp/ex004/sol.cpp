#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution
{
public:
  double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2)
  {
    int l;

    nums1.insert(end(nums1), begin(nums2), end(nums2));
    l = nums1.size();
    sort(begin(nums1), end(nums1));
    if(l%2 == 1)
      return nums1[(l-1)/2];
    else
      return (double)(nums1[l/2] + nums1[l/2 - 1])/2;
  }
};

int main()
{
  int vv[] = {1};
  int uu[] = {};
  vector<int> v(begin(vv), end(vv));
  vector<int> u(begin(uu), end(uu));
  Solution S;

  cout << S.findMedianSortedArrays(v, u) << endl;
  return (0);
}
