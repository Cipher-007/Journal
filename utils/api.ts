function createURL(path: string) {
  return window.location.origin + path;
}
export async function createNewEntry() {
  const res = await fetch(createURL("/api/journal"), {
    method: "POST",
    body: JSON.stringify({
      content: "Write about your day...",
    }),
  });

  if (res.ok) {
    const data = await res.json();

    return data.data;
  }
}

export async function updateEntry(id: string, content: string) {
  const res = await fetch(createURL(`/api/journal/${id}`), {
    method: "PATCH",
    body: JSON.stringify({
      content,
    }),
  });

  if (res.ok) {
    const data = await res.json();

    return data.data;
  }
}

export async function askQuestion(question: string) {
  const res = await fetch(createURL("/api/question"), {
    method: "POST",
    body: JSON.stringify({
      question,
    }),
  });

  if (res.ok) {
    const data = await res.json();

    return data.data;
  }
}
