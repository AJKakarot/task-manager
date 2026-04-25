import env from "./env.js";

const allowedOrigins = env.corsOrigins
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("CORS policy does not allow this origin"));
  },
  credentials: true
};

export default corsOptions;
