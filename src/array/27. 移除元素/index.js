// 输入：nums = [3,2,2,3], val = 3
// 输出：2, nums = [2,2]
// 解释：函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。你不需要考虑数组中超出新长度后面的元素。例如，函数返回的新长度为 2 ，而 nums = [2,2,3,3] 或 nums = [2,2,0,0]，也会被视作正确答案。

var removeElement = function(nums, val) {
    var i = 0;
    for(let j =0;j<nums.length;j++){
        if(nums[j] !== val){
            nums[i] = nums[j]
            i++
        }
    }
    return nums
};