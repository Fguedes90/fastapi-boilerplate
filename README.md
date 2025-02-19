# Full Stack FastAPI Template

Opinated fork of the official FastAPI Template

## Technology Stack and Features

### Backend
- ⚡ [**FastAPI**](https://fastapi.tiangolo.com) - Modern Python web framework
    - 🧰 [SQLModel](https://sqlmodel.tiangolo.com) - SQL database ORM
    - 🔍 [Pydantic](https://docs.pydantic.dev) - Data validation and settings management
    - 🔄 [Alembic](https://alembic.sqlalchemy.org) - Database migrations
    - 🔐 [Passlib](https://passlib.readthedocs.io) - Password hashing with BCrypt
    - 🎫 [PyJWT](https://pyjwt.readthedocs.io) - JWT token handling
    - 📧 [Emails](https://github.com/lavr/python-emails) - Email sending with [Jinja2](https://jinja.palletsprojects.com)
    - 🔄 [Tenacity](https://tenacity.readthedocs.io) - Retrying operations
    - 🌐 [HTTPX](https://www.python-httpx.org) - HTTP client
    - 🎯 [Sentry SDK](https://docs.sentry.io/platforms/python/guides/fastapi/) - Error tracking
- 🧪 Testing and Quality
    - [Pytest](https://pytest.org) - Testing framework
    - [Mutmut](https://mutmut.readthedocs.io/) - Mutation testing
    - [Ruff](https://docs.astral.sh/ruff/) - Fast Python linter
    - [MyPy](https://mypy.readthedocs.io) - Static type checking

### Frontend
- 🚀 [React](https://react.dev) with TypeScript
- 🎨 UI and Styling
    - [ShadCN](https://ui.shadcn.com/) - Component library
    - [Radix UI](https://www.radix-ui.com/) - Accessible UI primitives
    - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
    - [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) - Animations
    - [Lucide React](https://lucide.dev/) - Icon set
    - [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support
- 🧪 Testing
    - [Vitest](https://vitest.dev) - Unit testing
    - [Playwright](https://playwright.dev) - End-to-End testing
- 🛠️ Development Tools
    - [Vite](https://vitejs.dev) - Build tool and dev server
    - [Biome](https://biomejs.dev) - Linting, formatting, and code quality
    - [OpenAPI-ts](https://openapi-ts.dev/) - API client generator
- 📡 State and Routing
    - [TanStack Query](https://tanstack.com/query/latest) - Data fetching and caching
    - [TanStack Router](https://tanstack.com/router/latest) - Type-safe routing
    - [React Hook Form](https://react-hook-form.com/) - Form handling
    - [Zod](https://zod.dev/) - Schema validation

### Infrastructure
- 💾 [PostgreSQL](https://www.postgresql.org) - SQL database
- 🐋 [Docker Compose](https://www.docker.com) - Container orchestration
- 📞 [Traefik](https://traefik.io) - Reverse proxy and load balancer
- 📊 Observability Stack
    - [Loki](https://grafana.com/oss/loki/) - Log aggregation
    - [Grafana](https://grafana.com/) - Metrics visualization
    - [Tempo](https://grafana.com/oss/tempo/) - Distributed tracing
    - [Prometheus](https://prometheus.io/) - Metrics collection and storage
- 🔒 Security Features
    - Secure password hashing
    - JWT authentication
    - Email-based password recovery
- 🚢 Deployment
    - Docker Compose deployment
    - Automatic HTTPS with Traefik
    - GitHub Actions CI/CD

## How To Use It

You can **just fork or clone** this repository and use it as is.

✨ It just works. ✨

### How to Use a Private Repository

If you want to have a private repository, GitHub won't allow you to simply fork it as it doesn't allow changing the visibility of forks.

But you can do the following:

- Create a new GitHub repo, for example `my-full-stack`.
- Clone this repository manually, set the name with the name of the project you want to use, for example `my-full-stack`:

```bash
git clone git@github.com:fastapi/full-stack-fastapi-template.git my-full-stack
```

- Enter into the new directory:

```bash
cd my-full-stack
```

- Set the new origin to your new repository, copy it from the GitHub interface, for example:

```bash
git remote set-url origin git@github.com:octocat/my-full-stack.git
```

- Add this repo as another "remote" to allow you to get updates later:

```bash
git remote add upstream git@github.com:fastapi/full-stack-fastapi-template.git
```

- Push the code to your new repository:

```bash
git push -u origin master
```

### Update From the Original Template

After cloning the repository, and after doing changes, you might want to get the latest changes from this original template.

- Make sure you added the original repository as a remote, you can check it with:

```bash
git remote -v

origin    git@github.com:octocat/my-full-stack.git (fetch)
origin    git@github.com:octocat/my-full-stack.git (push)
upstream    git@github.com:fastapi/full-stack-fastapi-template.git (fetch)
upstream    git@github.com:fastapi/full-stack-fastapi-template.git (push)
```

- Pull the latest changes without merging:

```bash
git pull --no-commit upstream master
```

This will download the latest changes from this template without committing them, that way you can check everything is right before committing.

- If there are conflicts, solve them in your editor.

- Once you are done, commit the changes:

```bash
git merge --continue
```

### Configure

You can then update configs in the `.env` files to customize your configurations.

Before deploying it, make sure you change at least the values for:

- `SECRET_KEY`
- `FIRST_SUPERUSER_PASSWORD`
- `POSTGRES_PASSWORD`

You can (and should) pass these as environment variables from secrets.

Read the [deployment.md](./deployment.md) docs for more details.

### Generate Secret Keys

Some environment variables in the `.env` file have a default value of `changethis`.

You have to change them with a secret key, to generate secret keys you can run the following command:

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Copy the content and use that as password / secret key. And run that again to generate another secure key.

### Available Make Commands

The project includes a Makefile with several useful commands to help you manage the development workflow:

#### Setup and Installation
- `make setup` - Run initial setup (installs backend, frontend, and pre-commit hooks)
- `make backend-install` - Install backend dependencies using uv
- `make frontend-install` - Install frontend dependencies using npm
- `make precommit-install` - Install pre-commit hooks

#### Development
- `make up` - Start all containers in detached mode
- `make down` - Stop and remove all containers and volumes
- `make logs` - View container logs in follow mode
- `make generate-client` - Generate frontend API client from OpenAPI spec
- `make lint` - Run pre-commit hooks on all files

#### Testing
- `make test` - Run all tests in containers
- `make test-local` - Run tests locally

#### Deployment
- `make build` - Build Docker images
- `make build-push` - Build and push Docker images
- `make deploy` - Deploy the stack

#### Maintenance
- `make clean` - Remove containers, volumes, and Python cache files

## Observability Stack

The project includes a comprehensive observability stack that can be managed separately:

### Quick Start

```bash
# Start only the observability stack
make obs-up

# Stop the observability stack
make obs-down

# View observability services logs
make obs-logs
```

### Access Points

- Grafana: http://grafana.localhost (default credentials: admin/admin)
- Included Dashboards:
  - FastAPI Metrics: Application performance metrics
  - Application Logs: Centralized logging
  - Service Traces: Distributed tracing visualization

For detailed information about the observability stack, see [development.md](./development.md).

## Backend Development

Backend docs: [backend/README.md](./backend/README.md).

## Frontend Development

Frontend docs: [frontend/README.md](./frontend/README.md).

## Deployment

Deployment docs: [deployment.md](./deployment.md).

## Development

General development docs: [development.md](./development.md).

This includes using Docker Compose, custom local domains, `.env` configurations, etc.


## License

The Full Stack FastAPI Template is licensed under the terms of the MIT license.
