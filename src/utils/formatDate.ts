export default function formatDate(date_input: Date) {
    let dateEntry = new Date(date_input);
    const now = new Date();
    const diff = Math.abs(now.getTime() - dateEntry.getTime());
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
  
    if (seconds < 1) {
      return "Just now";
    } else if (seconds < 60) {
      return `${Math.floor(seconds)} seconds ago`;
    } else if (minutes < 60) {
      return `${Math.floor(minutes)} minutes ago`;
    } else if (hours < 24) {
      return `${Math.floor(hours)} hours ago`;
    } else if (days < 7) {
      return `${Math.floor(days)} days ago`;
    } else {
      return dateEntry.toDateString();
    }
  }