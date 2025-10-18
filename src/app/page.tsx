"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Container } from "@mui/material";

export default function Home() {
  const router = useRouter();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={() => router.push("/signup")}
          sx={{ px: 3, py: 1 }}
        >
          Sign Up
        </Button>
        <Button
          variant="outlined"
          onClick={() => router.push("/signin")}
          sx={{ px: 3, py: 1 }}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
}
