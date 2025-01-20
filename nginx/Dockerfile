# Use the official Nginx image as the base image
FROM nginx:alpine

# Remove the default Nginx configuration (if needed)
RUN rm /etc/nginx/conf.d/default.conf || true

# Copy the custom main Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the custom site configuration (default server block)
COPY default.conf /etc/nginx/nginx.conf

# Copy SSL certificates
COPY finanical.crt /etc/nginx/financical.crt
COPY financical.key /etc/nginx/financical.key

# Set the working directory
WORKDIR /usr/share/nginx/html

# Expose the ports on which Nginx will run
EXPOSE 443

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
