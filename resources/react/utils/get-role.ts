const getRole = (userId: number, ownerId: number, isMember: boolean) => {
  // 1: オーナー, 2: メンバー, 3: 権限なし
  if (userId === ownerId) return 1
  if (isMember) return 2
  return 3
}

export default getRole
