# =========================
# STAGE 1: Build .NET App
# =========================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app


# Copy csproj và restore riêng để cache tốt hơn
COPY ["backend.csproj", "./"]
RUN dotnet restore "backend.csproj"

# Copy toàn bộ source và build
COPY . .
RUN dotnet publish "backend.csproj" -c Release -o /app/out /p:UseAppHost=false

# =========================
# STAGE 2: Runtime
# =========================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

# Biến môi trường ASP.NET
ENV ASPNETCORE_URLS=http://+:8080
#ENV ASPNETCORE_ENVIRONMENT=Production
EXPOSE 8080 

ENTRYPOINT ["dotnet", "backend.dll"]
