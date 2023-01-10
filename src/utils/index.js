export const isFalsy = (value) => (value === 0 ? false : !value)

// 把对象里值为空的键直接删掉，这样url中不再携带非必要的
// 还会产生find效果的key

// 应该写成纯函数，防止污染
export const cleanObject = (obj) => {
    const result = { ...obj }
    Object.keys(obj).forEach((key) => {
        const value = obj[key]

        if (isFalsy(value)) {
            delete result[key]
        }
    })

    return result
}
