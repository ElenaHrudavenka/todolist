import { Typography } from "@mui/material";

export const InputError = ({ error }: { error?: string }) =>
    error
        ? <Typography color="error" variant="body2">{error}</Typography>
        : null;
        