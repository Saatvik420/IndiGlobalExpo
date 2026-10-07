# Build stage
FROM maven:3.9.9-eclipse-temurin-21-jammy AS build
WORKDIR /app

# Configure Maven to use IPv4 and enable connection retries
ENV MAVEN_OPTS="-Djava.net.preferIPv4Stack=true -Dmaven.wagon.http.retryHandler.count=5 -Dmaven.wagon.http.retryHandler.requestSentEnabled=true"

# Copy pom.xml first to optimize Docker layer caching
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B -DskipTests || true

# Copy source code and build package
COPY src ./src
RUN mvn clean package -DskipTests -e -U --batch-mode

# Run stage
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 5000
ENTRYPOINT ["java", "-jar", "app.jar"]
