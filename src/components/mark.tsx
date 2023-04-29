export const Mark = ({
    name,
    keyword,
}: {
    name: string
    keyword: string | undefined
}) => {
    if (!keyword) {
        return <>{name}</>
    }

    const arr = name.split(keyword)
    return (
        <>
            {arr.map((str: string, index: number) => (
                <span key={index}>
                    {str}
                    {index === arr.length - 1 ? null : (
                        <span key={index} style={{ color: '#257AFD' }}>
                            {keyword}
                        </span>
                    )}
                </span>
            ))}
        </>
    )
}
