// 解题思路
// https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/solution/shuang-zhi-zhen-shan-chu-you-xu-shu-zu-z-3pi4/
var removeDuplicates = function (nums) {
    var i = 0;
    for (let j = 0; j < nums.length; j++) {
        if (nums[i] !== nums[j]) {
            i++
            nums[i] = nums[j]
        }
    }
    return i + 1
};