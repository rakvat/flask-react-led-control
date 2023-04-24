# LED Strip controller

for LW-12 wifi wlan led rgb strips controller

flask python backend with react frontend

## Setup

Create environments for python and node as defined in `.direnv`.

Install backend requirements via:
```
cd backend && poetry install
```

Install frontend requirements via:
```
cd frontend && npm install
```

## Run

Start both frontend and backend via the `Procfile` via

```
honcho start
```
