// 输入：nums = [4,2,2,3], val = 3
// 输出：2, nums = [2,2]
var removeElement = function(nums, val) {
    let ans = 0;
    for(const num of nums) {
        if(num != val) {
            nums[ans] = num;
            ans++;
        }
    }
    return ans;
};