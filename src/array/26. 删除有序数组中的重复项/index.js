var removeDuplicates = function (nums) {
    var slow = 0; fast = 0; len = nums.length
    while (fast < len) {
        if (nums[slow] === nums[fast]) {
            fast++
        } else {
            slow++
            nums[slow] = nums[fast]
        }
    }
    return slow + 1
};                                                                                                                       