import { AppError } from "../utils/AppError.js";

const authorizeRoles =
  (...allowed) =>
  (req, _res, next) => {
    if (!allowed.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );
    }
    next();
  };

export default authorizeRoles;
