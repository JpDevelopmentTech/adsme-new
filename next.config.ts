import type { NextConfig } from "next";

/**
 * El cuerpo de las Server Actions se limita a 1 MB por defecto, lo que rechazaba
 * cualquier foto de perfil real. Se sube a los 4 MB que acepta el uploader
 * (`AVATAR_MAX_SIZE_BYTES`) más medio MB de margen para las cabeceras y
 * separadores que añade el `multipart/form-data`.
 */
const SERVER_ACTION_BODY_LIMIT = 4 * 1024 * 1024 + 512 * 1024;

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: SERVER_ACTION_BODY_LIMIT,
    },
  },
};

export default nextConfig;
