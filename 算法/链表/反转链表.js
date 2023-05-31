function reverse(head, tail, terminal) {
  let cur = head;
  let pre;
  while (cur !==   terminal) {
    // 留下联系方式
    let next = cur.next;
    // 修改指针
    cur.next = pre;
    // 继续往下走
    pre = cur;
    cur = next;
  }

  return tail, head;
}
