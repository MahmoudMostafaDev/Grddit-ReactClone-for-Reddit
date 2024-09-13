export function formatDesc(desc) {
  return desc.length > 500 ? desc.substring(0, 500) + "..." : desc;
}

export function formatVotes(votes) {
  if (votes < 1000) {
    return votes;
  }
  return (votes / 1000).toFixed(1) + "K";
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}
