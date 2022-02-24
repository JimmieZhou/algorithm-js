var twoSum = function (nums, target) {
    var map = {}; // key: 数组中的某个值 value: 下标
    for (let index = 0; index < nums.length; index++) {
        if (map[target - nums[index]] !== undefined) {
            return [map[target - nums[index]], index]
        } else {
            map[nums[index]] = index
        }
    }
};
