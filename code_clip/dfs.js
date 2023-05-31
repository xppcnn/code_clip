function dfs(node){
  const stack = []
  stack.push(node)
  while(node=stack[stack.length-1]){
    if(node.visited){
      console.log('回溯阶段: ', node.name);
      stack.pop()
    }else{
      console.log('探寻阶段: ', node.name);
      node.visited = true;
      for(let child of node.children){
        stack.push(child)
      }
    }
  }
}