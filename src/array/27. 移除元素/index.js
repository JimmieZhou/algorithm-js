// 输入：nums = [3,2,2,3], val = 3
// 输出：2, nums = [2,2]
var removeElement = function (nums, val) {
    var slow = 0; fast = nums.length
    while (slow < fast) {
        if (nums[slow] === val) {
            nums[slow] = nums[fast -1]
            fast--
        } else {
            slow++
        }
    }
    return slow
};