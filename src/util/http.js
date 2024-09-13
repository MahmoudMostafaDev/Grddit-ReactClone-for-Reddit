import { getToken, getUsername } from "./auth";
import axios from "axios";
import slugify from "slugify";
export async function signUp(body) {
  // const response = await fetch("https://grddit-backend.onrender.com/register", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  //   body: body,
  // });
  // if (response.data) {
  //   if (response.data.error && response.data.error === "already exist") {
  //     throw new Error("Username already exists");
  //   }
  //   const token = response.data.token;
  //   return token;
  // }
  try {
    const response = await axios.post(
      "https://grddit-backend.onrender.com/register",
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const token = response.data.token;
    return token;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
}
export async function LoginFn(body) {
  const response = await fetch("https://grddit-backend.onrender.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (data.error && data.error === "user or password invalid") {
    throw new Error("Username or Password is incorrect");
  }

  if (!response.ok) {
    throw new Error(response.error || "Something went wrong");
  }

  const token = data.token;
  return token;
}

export async function createSub(formData) {
  try {
    const response = await axios.post(
      `https://grddit-backend.onrender.com/api/subs/${formData.get("subId")}`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + getToken(),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
}

export async function getHomepage(payload) {
  const username = localStorage.getItem("username");
  let response = null;
  if (username != "null") {
    response = await fetch(
      `https://grddit-backend.onrender.com/api/posts/homepage/${username}`
    );
  } else {
    response = await fetch(
      `https://grddit-backend.onrender.com/api/posts/homepage`
    );
  }
  if (!response.ok) {
    throw new Error(response.error || "unknown");
  }
  const data = await response.json();
  return data;
}
export async function getSubs(id) {
  const response = await fetch(
    `https://grddit-backend.onrender.com/api/subs/${id}`
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(response.error || "unknown");
  }
  if (data.sub == null) {
    throw new Error("This sub doesn't exist");
  }

  return data;
}

export async function createPost(formData) {
  const slug = slugify(formData.get("title"), { lower: true });
  try {
    const res = await axios.post(
      `https://grddit-backend.onrender.com/api/posts/${slug}`,
      formData,
      {
        headers: {
          Authorization: "Bearer " + getToken(),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

export async function getSubPosts(id) {
  const response = await fetch(
    `https://grddit-backend.onrender.com/api/posts/subPosts/${id}`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(response.error || "unknown");
  }
  return data;
}

export async function joinSub(id) {
  const response = await fetch(
    `https://grddit-backend.onrender.com/api/subs/${id}/join`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(response.error || "unknown");
  }
  return data;
}

export async function getUserInfo(username) {
  const response = await fetch(
    `https://grddit-backend.onrender.com/api/user/${username}`
  );
  const data = await response.json();
  if (!data.success) {
    if (
      data.error ==
      "Cannot destructure property 'username' of '(intermediate value)' as it is null."
    ) {
      throw new Error("User doesn't exist");
    }
  }
  if (!response.ok) {
    throw new Error(response.error || "unknown");
  }

  return data;
}

export async function vote({ id, direction }) {
  const response = await fetch(
    `https://grddit-backend.onrender.com/api/posts/${id}/${direction}`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(response.error || "unknown");
  }
  return data;
}
export async function addMainComment({ id, comment }) {
  const response = await fetch(
    `https://grddit-backend.onrender.com/api/posts/${id}/comment`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(response.error || "unknown");
  }
  return data;
}
export async function getPostData(id) {
  const response = await fetch(
    `https://grddit-backend.onrender.com/api/posts/${id}`
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(response.error || "unknown");
  }
  return data;
}

export async function addSubComment({ id, reply, commentId }) {
  const response = await fetch(
    `https://grddit-backend.onrender.com/api/posts/reply/${id}`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reply, commentId }),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(response.error || "unknown");
  }
  return data;
}

export async function commentVote({ id, commentId, direction }) {
  const response = await fetch(
    `https://grddit-backend.onrender.com/api/posts/${id}/commentVote`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId, direction }),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(response.error || "unknown");
  }
  return data;
}

export async function getRandomPosts() {
  const response = await fetch(
    `https://grddit-backend.onrender.com/api/posts/random`
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(response.error || "unknown");
  }
  return data;
}

export async function getMiniSubs() {
  const response = await fetch(
    `https://grddit-backend.onrender.com/api/subs/explore`
  );
  const data = response.json();
  if (!response.ok) {
    throw new Error(response.error || "unknown");
  }
  return data;
}

export async function addRecent(id, post) {
  const response = await fetch(
    `https://grddit-backend.onrender.com/api/user/${id}/recent`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ post }),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(response.error || "unknown");
  }
  return data;
}
export async function getRecent() {
  const response = await fetch(
    `https://grddit-backend.onrender.com/api/user/${getUsername()}/recent`
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(response.error || "unknown");
  }

  return data;
}

export async function getChats() {
  const response = await fetch(
    `https://grddit-backend.onrender.com/api/chats`,
    {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(response.error || "unknown");
  }
  return data;
}

export async function searchPosts(keyword) {
  const response = await fetch(
    `https://grddit-backend.onrender.com/api/posts/search/${keyword}`
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(response.error || "unknown");
  }
  return data;
}

export async function searchSubs(keyword) {
  const response = await fetch(
    `https://grddit-backend.onrender.com/api/subs/search/${keyword}`
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(response.error || "unknown");
  }
  return data;
}
