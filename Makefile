build:
	docker build -t nextjs-docker .

start:
	docker run -p 3000:3000 nextjs-docker
