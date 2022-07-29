import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export function dateFormat(timestamp: FirebaseFirestoreTypes.Timestamp) {
  if (timestamp) {
    const date = new Date(timestamp.toDate());
    const day = date.toLocaleDateString("pt-PT");
    const hours = date.toLocaleTimeString("pt-PT");

    return `${day} at ${hours}`;
  }
}
