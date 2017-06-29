#include <iostream>
#include <stdlib.h>

using namespace std;

typedef struct s_ListNode
{
  int data;
  struct s_ListNode *next;
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

int check_zero(t_ListNode **l1)
{
  t_ListNode *tmp;

  tmp = *l1;
  while(tmp->next)
    {
      if(tmp->data != 0)
	{
	  return (1);
	}
      tmp = tmp->next;
    }
  if(tmp->data != 0)
    return (1);
  return (0);
}

int list_size(t_ListNode **list)
{
  t_ListNode *tmp;
  int i = 0;
  
  tmp = *list;
  if(!tmp)
    return (0);
  while(tmp->next)
    {
      tmp = tmp->next;
      i++;
    }
  i++;
  return (i);
}

void complete_zeros(t_ListNode **list, int size)
{
  t_ListNode *tmp;

  tmp = *list;
  while(list_size(&tmp) < size || list_size(&tmp) < 3)
    {
      ft_list_push_back(&tmp, 0);
    }
}

void remove_zeros(t_ListNode **list)
{
  t_ListNode *tmp;
  t_ListNode *adrs;
  int flag;

  flag = 0;
  tmp = *list;
  if(list_size(&tmp) > 1)
    flag = 1;
  else
    return ;
  while(tmp->next)
    {
      adrs = tmp;
      tmp = tmp->next;
    }
  if(flag)
    {
      if(tmp->data == 0)
	{
	  free(&(tmp->data));
	  tmp = adrs;
	  tmp->next = NULL;
	}
      else
	return ;
    }
  remove_zeros(list);
}

class Solution
{
public:
  t_ListNode* addTwoNumbers(t_ListNode *l1, t_ListNode *l2)
  {
   t_ListNode *A;
   int i;
   int size;
   
   size = (list_size(&l1) >= list_size(&l2)) ? list_size(&l1) : list_size(&l2);
   complete_zeros(&l1, size);
   complete_zeros(&l2, size);

   i = 0;
   A = (t_ListNode *)malloc(sizeof(t_ListNode));

   if(l1->data + l2->data + i > 9)
     {
       A = ft_create_elem(l1->data + l2->data - 10 + i);
       i = 1;
     }
   else
     {
       A = ft_create_elem(l2->data + l1->data);
       i = 0;
     }
   l1 = l1->next;
   l2 = l2->next;
   while(l1->next || l2->next)
     {
       if(l1->data + l2->data + i > 9)
	 {
	   ft_list_push_back(&A, l1->data + l2->data - 10 + i);
	   i = 1;
	 }
       else
	 {
	   ft_list_push_back(&A, l2->data + l1->data + i);
	   i = 0;
	  }
       l1 = l1->next;
       l2 = l2->next;
     }
   if(l1->data + l2->data + i > 9)
     {
       ft_list_push_back(&A, l2->data + l1->data - 10 + i);
       i = 1;
     }
   else
     {
       ft_list_push_back(&A, l2->data + l1->data + i);
       i = 0;
     }
   if(l2->data + l1->data + i <10)
     i = 0;
   if(i == 1)
     ft_list_push_back(&A, 1);
   remove_zeros(&A);
   return A;
  }
};

int main()
{  
  t_ListNode *l1;
  t_ListNode *l2;
  Solution sol;
  t_ListNode *res;

  l1 = ft_create_elem(0);
  l2 = ft_create_elem(0); 
    
  //ft_list_push_back(&l1, 9);
  //ft_list_push_back(&l1, 9);
  //ft_list_push_back(&l1, 9);
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
