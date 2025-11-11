import { normalizeLocation } from "./normalizeLocation.js";

export const buildFilter = (queryParams, options = {}) => {
  const {
    searchFields = [],
    exactFields = [],
    booleanFields = [],
    useLocation = false,
    textSearchField = null,
  } = options;

  const filter = {};

  searchFields.forEach((field) => {
    if (queryParams[field]) {
      filter[field] = { $regex: queryParams[field], $options: "i" };
    }
  });

  exactFields.forEach((field) => {
    if (queryParams[field]) {
      if (typeof queryParams[field] === "string") {
        filter[field] = { $regex: new RegExp(`^${queryParams[field]}$`, "i") };
      } else {
        filter[field] = queryParams[field];
      }
    }
  });

  booleanFields.forEach((field) => {
    if (queryParams[field] !== undefined) {
      filter[field] = queryParams[field] === "true";
    }
  });

  if (useLocation && queryParams.location) {
    const locationRegex = normalizeLocation(queryParams.location);
    if (locationRegex) {
      filter.location = locationRegex;
    }
  }

  if (textSearchField && queryParams[textSearchField]) {
    filter.$text = { $search: queryParams[textSearchField] };
  }

  return filter;
};

export const buildJobFilter = (queryParams) => {
  const filter = buildFilter(queryParams, {
    searchFields: [
      "title",
      "description",
      "category",
      "level",
      "salary",
      "degreeRequirement",
      "experienceRequirement",
      "genderRequirement",
      "requirements",
      "benefits",
      "specificAddress",
    ],
    exactFields: ["jobType", "company"],
    booleanFields: ["isFeatured"],
    useLocation: true,
    textSearchField: "keyword",
  });

  if (queryParams.search) {
    const regex = new RegExp(queryParams.search, "i");
    filter.$or = [
      { title: regex },
      { description: regex },
      { category: regex },
      { level: regex },
      { location: regex },
      { jobType: regex },
    ];
  }

  if (queryParams.hiringQuantity) {
    filter.hiringQuantity = { $gte: Number(queryParams.hiringQuantity) };
  }

  if (queryParams.isActive === "true") {
    filter.applicationDeadline = { $gte: new Date() };
  }

  if (queryParams.keywords) {
    filter.keywords = {
      $in: queryParams.keywords.split(",").map((k) => k.trim()),
    };
  }

  return filter;
};

export const buildCompanyFilter = (queryParams) => {
  return buildFilter(queryParams, {
    searchFields: ["headline", "description", "website", "size"],
    exactFields: ["user"],
    booleanFields: [],
    useLocation: true,
  });
};

export const buildBlogFilter = (queryParams) => {
  const filter = buildFilter(queryParams, {
    searchFields: ["title", "content"],
    exactFields: ["author"],
    booleanFields: [],
  });

  if (queryParams.tags) {
    filter.tags = { $in: queryParams.tags.split(",").map((t) => t.trim()) };
  }

  if (queryParams.tag) {
    filter.tags = queryParams.tag;
  }

  if (queryParams.createdAfter) {
    filter.createdAt = { $gte: new Date(queryParams.createdAfter) };
  }

  if (queryParams.createdBefore) {
    filter.createdAt = {
      ...filter.createdAt,
      $lte: new Date(queryParams.createdBefore),
    };
  }

  return filter;
};

export const buildUserFilter = (queryParams) => {
  const filter = buildFilter(queryParams, {
    searchFields: ["fullName", "username", "email"],
    exactFields: ["role_id"],
    booleanFields: ["isActive", "deleted"],
  });

  if (queryParams.lastLoginAfter) {
    filter.timeLogin = { $gte: new Date(queryParams.lastLoginAfter) };
  }

  if (queryParams.lastLoginBefore) {
    filter.timeLogin = {
      ...filter.timeLogin,
      $lte: new Date(queryParams.lastLoginBefore),
    };
  }

  if (queryParams.createdAfter) {
    filter.createdAt = { $gte: new Date(queryParams.createdAfter) };
  }

  if (queryParams.createdBefore) {
    filter.createdAt = {
      ...filter.createdAt,
      $lte: new Date(queryParams.createdBefore),
    };
  }

  return filter;
};

export const buildCVFilter = (queryParams) => {
  const filter = buildFilter(queryParams, {
    searchFields: ["title", "githubLink"],
    exactFields: ["userId"],
    booleanFields: [],
  });

  if (queryParams.skills) {
    filter.skills = { $in: queryParams.skills.split(",").map((s) => s.trim()) };
  }

  if (queryParams.hasFile === "true") {
    filter.fileUrl = { $ne: null };
  } else if (queryParams.hasFile === "false") {
    filter.fileUrl = null;
  }

  return filter;
};

export default buildFilter;
