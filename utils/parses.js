export const parseDataToOption = data => {
  return data?.filter(d => d.profile_id.$oid === '606bcba2e4eafb10df0a47a4').map(d => {
    return { label: d.name, value: d._id.$oid }
  })
}