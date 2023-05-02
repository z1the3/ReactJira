export const reorder = ({
    fromId,
    type,
    referenceId,
    list,
}: {
    list: { id: number }[]
    fromId: number
    type: 'after' | 'before'
    referenceId: number
}) => {
    // console.log(fromId,referenceId,type)
    const copiedList = [...list]
    // 根据id找到对应index
    const movingItemIndex = copiedList.findIndex((item) => item.id === fromId)
    if (!referenceId) {
        return insertAfter(
            [...copiedList],
            movingItemIndex,
            copiedList.length - 1
        )
    }
    const targetIndex = copiedList.findIndex((item) => item.id === referenceId)
    const insert = type === 'after' ? insertAfter : insertBefore
    return insert([...copiedList], movingItemIndex, targetIndex)
}

const insertBefore = (list: unknown[], from: number, to: number) => {
    const toItem = list[to]
    const removeItem = list.splice(from, 1)[0]
    const toIndex = list.indexOf(toItem)
    list.splice(toIndex, 0, removeItem)
    return list
}

const insertAfter = (list: unknown[], from: number, to: number) => {
    // 找到要去的item的index
    const toItem = list[to]

    const removeItem = list.splice(from, 1)[0]
    const toIndex = list.indexOf(toItem)
    list.splice(toIndex + 1, 0, removeItem)
    return list
}
