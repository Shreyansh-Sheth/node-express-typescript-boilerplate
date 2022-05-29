export const throwCustomValidationError = (field: string, message: string) => {
  return [
    {
      type: "custom",
      errors: {
        issues: [
          {
            path: [field],
            message,
          },
        ],
      },
    },
  ];
};
