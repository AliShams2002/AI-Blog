import { clientFetcher, serverFetcher } from "./Fetcher";

// User login - uses client fetcher
export const loginUser = async (params) => {
  try {
    const result = await clientFetcher(`/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(params),
    });
    if (!result.success) {
      console.error("Login error:", result.error);
      return {
        success: false,
        data: result.error || [],
      };
    }

    return {
      success: true,
      data: result.data || [],
    };
  } catch (error) {
    console.error("Unexpected error in loginUser:", error);
    return {
      success: false,
      data: [],
      error: {
        message: "خطا در ورود",
        type: "SERVER_ERROR",
      },
    };
  }
};

// Fetch all users - uses server fetcher with authentication
export const getAllUsers = async () => {
  try {
    const result = await serverFetcher("/api/auth/users");
    if (!result.success) {
      console.error("Error retrieving users:", result.error);
      return {
        success: false,
        data: [],
        error: result.error,
      };
    }

    return {
      success: true,
      data: result.data || [],
    };
  } catch (error) {
    console.error("Unexpected error in getAllUsers:", error);
    return {
      success: false,
      data: [],
      error: {
        message: "خطا در دریافت کاربران",
        type: "SERVER_ERROR",
      },
    };
  }
};

// get user profile
export const getUserProfile = async () => {
  try {
    const result = await serverFetcher("/api/auth/profile");
    if (!result.success) {
      console.error("Error retrieving users profile:", result.error);
      return {
        success: false,
        data: [],
        error: result.error,
      };
    }

    return {
      success: true,
      data: result.data || [],
    };
  } catch (error) {
    console.error("Unexpected error in getUserProfile:", error);
    return {
      success: false,
      data: [],
      error: {
        message: "خطا در دریافت اطلاعات پروفایل",
        type: "SERVER_ERROR",
      },
    };
  }
};

// Create a new user (register)
export const createUser = async (params) => {
  try {
    const result = await serverFetcher("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(params),
    });
    if (!result.success) {
      console.error("Error creating new user:", result.error);
      return {
        success: false,
        data: [],
        error: result.error,
      };
    }

    return {
      success: true,
      data: result.data || [],
    };
  } catch (error) {
    console.error("Unexpected error in createUser:", error);
    return {
      success: false,
      data: [],
      error: {
        message: "خطا در ساخت کاربر جدید",
        type: "SERVER_ERROR",
      },
    };
  }
};

// Update a user's role
export const updateUserRole = async (params) => {
  try {
    const result = await serverFetcher(`/api/auth/users/${params.id}/role`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    if (!result.success) {
      console.error("Error updating user:", result.error);
      return {
        success: false,
        data: [],
        error: result.error,
      };
    }

    return {
      success: true,
      data: result.data || [],
    };
  } catch (error) {
    console.error("Unexpected error in updateUserRole:", error);
    return {
      success: false,
      data: [],
      error: {
        message: "خطا در بروزرسانی کاربر",
        type: "SERVER_ERROR",
      },
    };
  }
};

// Delete a user by ID
export const deleteUser = async (params) => {
  try {
    const { id } = params;
    const result = await serverFetcher(`/api/auth/users/${id}`, {
      method: "DELETE",
    });
    if (!result.success) {
      console.error("Error deleting user:", result.error);
      return {
        success: false,
        data: [],
        error: result.error,
      };
    }

    return {
      success: true,
      data: result.data || [],
    };
  } catch (error) {
    console.error("Unexpected error in deleteUser:", error);
    return {
      success: false,
      data: [],
      error: {
        message: "خطا در حذف کاربر",
        type: "SERVER_ERROR",
      },
    };
  }
};
