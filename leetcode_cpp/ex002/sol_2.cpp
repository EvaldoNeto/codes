#include <iostream>
#include <stdlib.h>

using namespace std;

typedef struct s_ListNode
{
  int data;
  struct s_ListNode *next;
  s_ListNode(int x) : data(x), next(NULL){}
}              t_ListNode;

t_ListNode *ft_create_elem(int data)
{
  t_ListNode *tmp;

  tmp = (t_ListNode *)malloc(sizeof(t_ListNode));
  if(tmp)
    {
      tmp->data = data;
      tmp->next = NULL;
    }
  return (tmp);
}

void ft_list_push_back(t_ListNode **begin_list, int data)
{
  t_ListNode *tmp;
  t_ListNode *aux;

  tmp = *begin_list;
  if(tmp)
    {
      aux = ft_create_elem(data);
	while(tmp->next)
	  {
	    tmp = tmp->next;
	  }
      tmp->next = aux;
    }
  else
    {
      tmp = ft_create_elem(data);
    }
}

class Solution
{
public:
  t_ListNode* addTwoNumbers(t_ListNode *l1, t_ListNode *l2)
  {
    int carry;
    int sum;
    t_ListNode A(0);
    t_ListNode *p;

    p = &A;
    carry  = 0;
    sum = 0;
    while(l1 || l2 || carry)
      {
	sum = (l1? l1->data : 0) + (l2? l2->data : 0) + carry;
	carry = sum/10;
	p->next = new t_ListNode(sum%10);
	p = p->next;
	l1 = (l1? l1->next : l1);
	l2 = (l2? l2->next : l2);
      }
    return A.next;
  }
};

int main()
{  
  t_ListNode *l1;
  t_ListNode *l2;
  Solution sol;
  t_ListNode *res;

  l1 = ft_create_elem(9);
  l2 = ft_create_elem(1); 
    
  ft_list_push_back(&l1, 9);
  ft_list_push_back(&l1, 9);
  ft_list_push_back(&l1, 9);
  //ft_list_push_back(&l2, 6);
  
  // ft_list_push_back(&l2, 6);
  //ft_list_push_back(&l2, 4);
  
  res = sol.addTwoNumbers(l1, l2);

  while(res->next)
    {
      cout << res->data;
      res = res->next;
    }
  cout << res->data << endl;
  return (0);
}
