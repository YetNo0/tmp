export default class BinaryTreeNode {
  value: number;
  left: BinaryTreeNode | null;
  right: BinaryTreeNode | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  hasLeftChild(): boolean {
    return this.left !== null;
  }

  hasRightChild(): boolean {
    return this.right !== null;
  }
}
