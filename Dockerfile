# syntax = docker/dockerfile:1.4

ARG NODE_VERSION=20.3.1-bullseye

# build assets & compile TypeScript

FROM --platform=$BUILDPLATFORM node:${NODE_VERSION} AS native-builder

RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
	--mount=type=cache,target=/var/lib/apt,sharing=locked \
	rm -f /etc/apt/apt.conf.d/docker-clean \
	; echo 'Binary::apt::APT::Keep-Downloaded-Packages "true";' > /etc/apt/apt.conf.d/keep-cache \
	&& apt-get update \
	&& apt-get install -yqq --no-install-recommends \
	build-essential

RUN corepack enable

WORKDIR /misskey

COPY --link ["pnpm-lock.yaml", "pnpm-workspace.yaml", "package.json", "./"]
COPY --link ["scripts", "./scripts"]
COPY --link ["packages/frontend/package.json", "./packages/frontend/"]
COPY --link ["packages/sw/package.json", "./packages/sw/"]
COPY --link ["packages/misskey-js/package.json", "./packages/misskey-js/"]

RUN --mount=type=cache,target=/root/.local/share/pnpm/store,sharing=locked \
	pnpm i --frozen-lockfile --aggregate-output

COPY --link . ./

ARG NODE_ENV=production

RUN git submodule update --init
RUN pnpm build
RUN pnpm build
RUN rm -rf .git/

FROM --platform=$TARGETPLATFORM nginx:latest AS runner

WORKDIR /misskey

COPY --from=native-builder /misskey/built/_vite_/ ./_vite_
COPY --from=native-builder /misskey/built/_vite_/src/web/views/ ./
COPY --from=native-builder /misskey/built/_frontend_dist_ ./

# TODO nginx config
