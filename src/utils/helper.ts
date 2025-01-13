export const parseDateTime = (obj: String | Date | null) => {
    if (typeof obj === "string") {
      return new Date(obj).toLocaleDateString()
    }
    if (obj instanceof Date) {
      return obj.toLocaleDateString()
    }
    return ""
  }