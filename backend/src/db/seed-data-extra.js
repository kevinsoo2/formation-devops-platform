export const extraModules = [
  // ============================================================
  // PROMETHEUS - Module 3: Alerting avec Alertmanager
  // ============================================================
  {
    id: 'prom-03',
    courseId: 'prometheus',
    title: 'Alerting avec Alertmanager',
    duration: '3h',
    orderIndex: 3,
    theoryContent: `# Alerting avec Alertmanager

## 1. Introduction

L'alerting est un composant essentiel de toute stratégie de monitoring. Prometheus évalue les règles d'alerte et envoie les notifications à **Alertmanager**, un composant dédié qui gère le routage, le regroupement, la déduplication et la notification des alertes.

Alertmanager permet de :
- Router les alertes vers différents destinataires selon leur sévérité
- Grouper les alertes similaires pour éviter le spam
- Mettre en silence des alertes pendant les maintenances
- Inhiber certaines alertes quand d'autres sont déjà actives

## 2. Architecture d'Alerting

\`\`\`
┌──────────────┐     alertes     ┌──────────────────┐     notifications
│  Prometheus  │ ──────────────> │  Alertmanager    │ ──────────────────>
│  (évaluation │                 │  (routage,       │     Email, Slack,
│   des règles)│                 │   groupement,    │     PagerDuty...
└──────────────┘                 │   silences)      │
                                 └──────────────────┘
\`\`\`

Le flux d'alerting fonctionne en deux étapes :
1. Prometheus évalue les expressions PromQL des règles à intervalles réguliers
2. Quand une condition est remplie, l'alerte passe en état **pending** puis **firing**
3. Alertmanager reçoit l'alerte et applique le pipeline de notification

## 3. Configuration des règles d'alerte dans Prometheus

Les règles d'alerte sont définies dans des fichiers YAML référencés par la configuration Prometheus :

\`\`\`yaml
# prometheus.yml
rule_files:
  - "alerts/*.yml"

# alerts/infrastructure.yml
groups:
  - name: infrastructure
    interval: 30s
    rules:
      - alert: HighCPUUsage
        expr: 100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 5m
        labels:
          severity: warning
          team: infrastructure
        annotations:
          summary: "CPU élevé sur {{ \\\$labels.instance }}"
          description: "L'utilisation CPU dépasse 80% depuis 5 minutes (actuel: {{ \\\$value }}%)"

      - alert: DiskSpaceCritical
        expr: (node_filesystem_avail_bytes / node_filesystem_size_bytes) * 100 < 10
        for: 10m
        labels:
          severity: critical
          team: infrastructure
        annotations:
          summary: "Espace disque critique sur {{ \\\$labels.instance }}"
          description: "Moins de 10% d'espace disque disponible sur {{ \\\$labels.mountpoint }}"

      - alert: InstanceDown
        expr: up == 0
        for: 3m
        labels:
          severity: critical
          team: infrastructure
        annotations:
          summary: "Instance {{ \\\$labels.instance }} indisponible"
          description: "L'instance {{ \\\$labels.instance }} du job {{ \\\$labels.job }} est down depuis 3 minutes."
\`\`\`

## 4. Configuration d'Alertmanager

\`\`\`yaml
# alertmanager.yml
global:
  resolve_timeout: 5m
  smtp_smarthost: 'smtp.company.com:587'
  smtp_from: 'alertmanager@company.com'
  smtp_auth_username: 'alertmanager'
  smtp_auth_password: 'secret'

route:
  group_by: ['alertname', 'team']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  receiver: 'default-email'
  routes:
    - match:
        severity: critical
      receiver: 'pagerduty-critical'
      group_wait: 10s
    - match:
        team: frontend
      receiver: 'slack-frontend'
    - match_re:
        service: "api|backend"
      receiver: 'slack-backend'

receivers:
  - name: 'default-email'
    email_configs:
      - to: 'ops-team@company.com'
        send_resolved: true

  - name: 'pagerduty-critical'
    pagerduty_configs:
      - service_key: '<PD_SERVICE_KEY>'
        severity: critical

  - name: 'slack-frontend'
    slack_configs:
      - api_url: 'https://hooks.slack.com/services/xxx'
        channel: '#frontend-alerts'
        title: '{{ .GroupLabels.alertname }}'
        text: '{{ range .Alerts }}{{ .Annotations.summary }}\\n{{ end }}'

  - name: 'slack-backend'
    slack_configs:
      - api_url: 'https://hooks.slack.com/services/yyy'
        channel: '#backend-alerts'

inhibit_rules:
  - source_match:
      severity: 'critical'
    target_match:
      severity: 'warning'
    equal: ['alertname', 'instance']
\`\`\`

## 5. Silences et Maintenance

Les silences permettent de désactiver temporairement des alertes, par exemple pendant une maintenance planifiée :

\`\`\`bash
# Créer un silence via l'API
amtool silence add alertname="InstanceDown" instance="web-01:9100" \\
  --comment="Maintenance planifiée" \\
  --duration=2h

# Lister les silences actifs
amtool silence query

# Supprimer un silence
amtool silence expire <silence-id>
\`\`\`

## 6. Haute disponibilité d'Alertmanager

Alertmanager supporte le mode cluster pour la haute disponibilité :

\`\`\`bash
# Instance 1
alertmanager --config.file=alertmanager.yml \\
  --cluster.listen-address=0.0.0.0:9094 \\
  --cluster.peer=alertmanager-02:9094

# Instance 2
alertmanager --config.file=alertmanager.yml \\
  --cluster.listen-address=0.0.0.0:9094 \\
  --cluster.peer=alertmanager-01:9094
\`\`\`

Les instances se synchronisent via un protocole gossip pour éviter les notifications dupliquées.`,
    practiceContent: `# Exercices pratiques - Alerting avec Alertmanager

## Exercice 1 : Configurer des règles d'alerte

Créez un fichier de règles d'alerte pour monitorer une application web :

\`\`\`yaml
groups:
  - name: webapp
    rules:
      - alert: HighLatency
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 0.5
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Latence élevée détectée"
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) > 0.05
        for: 3m
        labels:
          severity: critical
        annotations:
          summary: "Taux d'erreur supérieur à 5%"
\`\`\`

Testez avec : \`promtool check rules alerts.yml\`

## Exercice 2 : Configurer le routage Alertmanager

Mettez en place un routage multi-équipes avec escalade :

\`\`\`yaml
route:
  receiver: 'default'
  routes:
    - match:
        severity: critical
      receiver: 'pagerduty'
      continue: true
    - match:
        severity: critical
      receiver: 'slack-urgent'
\`\`\`

Validez avec : \`amtool check-config alertmanager.yml\`

## Exercice 3 : Gérer les silences

Pratiquez la gestion des silences :

\`\`\`bash
# Créer un silence pour maintenance
amtool silence add alertname=~".*" instance="db-01:9100" --duration=1h

# Vérifier les alertes affectées
amtool alert query --inhibited --silenced
\`\`\`

## Exercice 4 : Tester le pipeline complet

Envoyez une alerte de test à Alertmanager :

\`\`\`bash
curl -XPOST http://localhost:9093/api/v1/alerts -d '[
  {"labels":{"alertname":"TestAlert","severity":"warning"},
   "annotations":{"summary":"Test d alerte manuelle"}}
]'
\`\`\``,
    keyPoints: JSON.stringify(['Les règles d\'alerte sont évaluées par Prometheus puis envoyées à Alertmanager', 'Le paramètre for définit la durée avant qu\'une alerte passe en état firing', 'Le routage hiérarchique permet de diriger les alertes vers les bons destinataires', 'Le groupement réduit le bruit en regroupant les alertes similaires', 'Les silences désactivent temporairement les alertes pendant les maintenances', 'Les inhibit_rules suppriment automatiquement certaines alertes quand d\'autres sont actives', 'Alertmanager supporte le clustering pour la haute disponibilité', 'Les annotations utilisent le templating Go pour personnaliser les messages']),
  },


  // ============================================================
  // PROMETHEUS - Module 4: PromQL avancé
  // ============================================================
  {
    id: 'prom-04',
    courseId: 'prometheus',
    title: 'PromQL avancé',
    duration: '3h',
    orderIndex: 4,
    theoryContent: `# PromQL Avancé

## 1. Introduction

PromQL (Prometheus Query Language) est le langage de requêtes puissant de Prometheus. Au-delà des requêtes simples, PromQL offre des fonctions avancées, des opérateurs d'agrégation sophistiqués et la possibilité de créer des recording rules pour pré-calculer des métriques complexes.

Maîtriser PromQL avancé permet de :
- Calculer des taux précis avec rate() et irate()
- Analyser les distributions avec les histogrammes
- Agréger intelligemment les métriques à travers les dimensions
- Optimiser les performances avec les recording rules

## 2. Fonctions de taux et dérivées

### rate() vs irate()

\`\`\`promql
# rate() - taux moyen sur une fenêtre (recommandé pour alertes)
rate(http_requests_total[5m])

# irate() - taux instantané (derniers 2 points, pour dashboards)
irate(http_requests_total[5m])

# increase() - augmentation absolue sur la période
increase(http_requests_total[1h])

# deriv() - dérivée pour les gauges
deriv(node_memory_MemFree_bytes[1h])
\`\`\`

### Gestion des resets de compteurs

rate() gère automatiquement les resets de compteurs (redémarrage d'application). La fonction détecte quand la valeur diminue et ajuste le calcul.

## 3. Histogrammes et quantiles

Les histogrammes Prometheus permettent de calculer des percentiles sans connaître les valeurs exactes :

\`\`\`promql
# P95 de la latence des requêtes HTTP
histogram_quantile(0.95,
  rate(http_request_duration_seconds_bucket[5m])
)

# P99 par endpoint
histogram_quantile(0.99,
  sum by(le, handler) (
    rate(http_request_duration_seconds_bucket[5m])
  )
)

# Latence moyenne depuis l'histogramme
rate(http_request_duration_seconds_sum[5m])
/
rate(http_request_duration_seconds_count[5m])

# Distribution des tailles de requêtes
histogram_quantile(0.5,
  rate(http_request_size_bytes_bucket[10m])
)
\`\`\`

## 4. Agrégations avancées

\`\`\`promql
# Top 5 des instances par utilisation CPU
topk(5, 100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100))

# Bottom 3 des services par disponibilité
bottomk(3, avg by(service) (up))

# Comptage des séries par label
count by(job) (up)

# Quantile d'agrégation (P90 des latences par service)
quantile by(service) (0.9, http_request_duration_seconds)

# Agrégation avec group_left pour joindre des métriques
sum by(instance) (rate(http_requests_total[5m]))
* on(instance) group_left(team)
  label_replace(up{job="node"}, "team", "backend", "instance", "backend.*")

# stddev pour détecter les anomalies
avg(rate(http_requests_total[5m])) + 2 * stddev(rate(http_requests_total[5m]))
\`\`\`

## 5. Opérateurs de comparaison et logiques

\`\`\`promql
# Filtrer les résultats (renvoie seulement les séries > seuil)
rate(http_requests_total{status="500"}[5m]) > 0.1

# bool modifier (renvoie 0 ou 1 au lieu de filtrer)
rate(http_requests_total{status="500"}[5m]) > bool 0.1

# unless - exclusion de séries
up unless on(instance) (node_filesystem_avail_bytes < 1e9)

# and - intersection
rate(http_requests_total[5m]) > 100
and
rate(http_requests_total{status=~"5.."}[5m]) > 5
\`\`\`

## 6. Fonctions avancées

\`\`\`promql
# predict_linear - prédiction linéaire
predict_linear(node_filesystem_avail_bytes[6h], 24*3600) < 0

# delta - changement pour les gauges
delta(process_resident_memory_bytes[1h])

# changes - nombre de changements de valeur
changes(process_start_time_seconds[1h]) > 0

# absent - détecter les séries manquantes
absent(up{job="critical-service"})

# label_replace - manipulation de labels
label_replace(up, "short_instance", "\\\$1", "instance", "(.*):.*")

# clamp_min / clamp_max - borner les valeurs
clamp_min(rate(http_requests_total[5m]), 0)

# sort_desc - tri décroissant
sort_desc(sum by(instance) (rate(http_requests_total[5m])))
\`\`\`

## 7. Recording Rules

Les recording rules pré-calculent des requêtes coûteuses et stockent le résultat comme nouvelle série :

\`\`\`yaml
# recording_rules.yml
groups:
  - name: http_metrics
    interval: 30s
    rules:
      - record: job:http_requests:rate5m
        expr: sum by(job) (rate(http_requests_total[5m]))

      - record: instance:http_latency:p95
        expr: histogram_quantile(0.95, sum by(le, instance) (rate(http_request_duration_seconds_bucket[5m])))

      - record: job:http_error_rate:ratio5m
        expr: |
          sum by(job) (rate(http_requests_total{status=~"5.."}[5m]))
          /
          sum by(job) (rate(http_requests_total[5m]))
\`\`\`

Les recording rules suivent la convention de nommage : \`level:metric:operations\`.`,
    practiceContent: `# Exercices pratiques - PromQL Avancé

## Exercice 1 : Calculs de taux et histogrammes

Écrivez les requêtes PromQL suivantes :

\`\`\`promql
# 1. Taux de requêtes par seconde, par status code
sum by(status) (rate(http_requests_total[5m]))

# 2. P99 de latence par route
histogram_quantile(0.99,
  sum by(le, route) (rate(http_request_duration_seconds_bucket[5m]))
)

# 3. Ratio d'erreurs global
sum(rate(http_requests_total{status=~"5.."}[5m]))
/ sum(rate(http_requests_total[5m]))
\`\`\`

## Exercice 2 : Agrégations complexes

\`\`\`promql
# Top 3 des pods consommant le plus de mémoire
topk(3, container_memory_usage_bytes{namespace="production"})

# Prédire quand le disque sera plein
predict_linear(node_filesystem_avail_bytes{mountpoint="/"}[7d], 30*24*3600) < 0
\`\`\`

## Exercice 3 : Recording rules

Créez des recording rules pour votre application :

\`\`\`yaml
groups:
  - name: app_sli
    rules:
      - record: app:availability:ratio5m
        expr: 1 - sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m]))
      - record: app:latency_p95:seconds
        expr: histogram_quantile(0.95, sum by(le)(rate(http_request_duration_seconds_bucket[5m])))
\`\`\`

## Exercice 4 : Détecter les anomalies

\`\`\`promql
# Détecter les pics de trafic (> 2 écarts-types)
rate(http_requests_total[5m])
> on(instance)
(avg by(instance) (rate(http_requests_total[5m] offset 1d))
+ 2 * stddev by(instance) (rate(http_requests_total[5m] offset 1d)))
\`\`\``,
    keyPoints: JSON.stringify(['rate() calcule le taux moyen sur une fenêtre et gère les resets de compteurs', 'histogram_quantile() calcule les percentiles à partir des buckets d\'histogramme', 'Les opérateurs group_left et group_right permettent de joindre des métriques de cardinalités différentes', 'predict_linear() permet d\'anticiper les problèmes futurs avec une extrapolation linéaire', 'Les recording rules pré-calculent les requêtes coûteuses pour améliorer les performances', 'La convention de nommage des recording rules est level:metric:operations', 'absent() détecte les séries manquantes pour alerter sur les services disparus', 'Les modificateurs offset et bool enrichissent les comparaisons temporelles et logiques']),
  },


  // ============================================================
  // PROMETHEUS - Module 5: Exporters et intégrations
  // ============================================================
  {
    id: 'prom-05',
    courseId: 'prometheus',
    title: 'Exporters et intégrations',
    duration: '3h',
    orderIndex: 5,
    theoryContent: `# Exporters et Intégrations Prometheus

## 1. Introduction

Les **exporters** sont des composants qui exposent les métriques de systèmes tiers au format Prometheus. Ils traduisent les métriques natives d'un service (base de données, système d'exploitation, application) en un format que Prometheus peut scraper.

L'écosystème Prometheus compte des centaines d'exporters couvrant :
- Infrastructure : serveurs, réseau, stockage
- Bases de données : PostgreSQL, MySQL, MongoDB, Redis
- Services web : Nginx, Apache, HAProxy
- Applications : JVM, Python, Go

## 2. Node Exporter

Le Node Exporter est l'exporter le plus utilisé. Il expose les métriques système d'une machine Linux :

\`\`\`bash
# Installation
wget https://github.com/prometheus/node_exporter/releases/download/v1.7.0/node_exporter-1.7.0.linux-amd64.tar.gz
tar xvf node_exporter-1.7.0.linux-amd64.tar.gz
cd node_exporter-1.7.0.linux-amd64

# Lancement avec collecteurs sélectifs
./node_exporter \\
  --collector.filesystem \\
  --collector.cpu \\
  --collector.meminfo \\
  --collector.netdev \\
  --collector.diskstats \\
  --no-collector.wifi \\
  --no-collector.nfs

# Systemd service
cat <<EOF > /etc/systemd/system/node_exporter.service
[Unit]
Description=Node Exporter
After=network.target

[Service]
Type=simple
User=node_exporter
ExecStart=/usr/local/bin/node_exporter --collector.systemd
Restart=always

[Install]
WantedBy=multi-user.target
EOF
\`\`\`

Métriques principales exposées :
- \`node_cpu_seconds_total\` : temps CPU par mode (user, system, idle)
- \`node_memory_MemTotal_bytes\` : mémoire totale
- \`node_filesystem_avail_bytes\` : espace disque disponible
- \`node_network_receive_bytes_total\` : trafic réseau entrant

## 3. Blackbox Exporter

Le Blackbox Exporter effectue des probes actives (HTTP, TCP, DNS, ICMP) pour tester la disponibilité externe :

\`\`\`yaml
# blackbox.yml
modules:
  http_2xx:
    prober: http
    timeout: 5s
    http:
      valid_http_versions: ["HTTP/1.1", "HTTP/2.0"]
      valid_status_codes: [200, 201, 301]
      method: GET
      follow_redirects: true
      preferred_ip_protocol: "ip4"

  http_post:
    prober: http
    http:
      method: POST
      headers:
        Content-Type: application/json
      body: '{"test": true}'

  tcp_connect:
    prober: tcp
    timeout: 5s
    tcp:
      preferred_ip_protocol: "ip4"

  dns_resolution:
    prober: dns
    dns:
      query_name: "example.com"
      query_type: "A"
      valid_rcodes:
        - NOERROR
\`\`\`

Configuration dans Prometheus avec relabeling :

\`\`\`yaml
scrape_configs:
  - job_name: 'blackbox-http'
    metrics_path: /probe
    params:
      module: [http_2xx]
    static_configs:
      - targets:
        - https://www.company.com
        - https://api.company.com/health
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: blackbox-exporter:9115
\`\`\`

## 4. Écrire un Custom Exporter

Créer un exporter personnalisé en Python avec la bibliothèque prometheus_client :

\`\`\`python
from prometheus_client import start_http_server, Gauge, Counter, Histogram
import time
import psutil

# Définir les métriques
app_active_users = Gauge('app_active_users', 'Number of active users', ['environment'])
app_requests_total = Counter('app_requests_total', 'Total requests', ['method', 'endpoint'])
app_response_time = Histogram('app_response_time_seconds', 'Response time',
                              buckets=[0.01, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0])

# Collecter les métriques
def collect_metrics():
    app_active_users.labels(environment='production').set(get_active_users())
    app_requests_total.labels(method='GET', endpoint='/api').inc()
    with app_response_time.time():
        process_request()

if __name__ == '__main__':
    start_http_server(8000)
    while True:
        collect_metrics()
        time.sleep(15)
\`\`\`

## 5. Service Discovery

Prometheus supporte la découverte automatique de cibles :

\`\`\`yaml
scrape_configs:
  # Kubernetes service discovery
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_port]
        action: replace
        target_label: __address__
        regex: (.+)
        replacement: \\\${1}

  # Consul service discovery
  - job_name: 'consul-services'
    consul_sd_configs:
      - server: 'consul.local:8500'
        services: ['web', 'api', 'db']
    relabel_configs:
      - source_labels: [__meta_consul_tags]
        regex: .*,prometheus,.*
        action: keep

  # File-based discovery
  - job_name: 'file-targets'
    file_sd_configs:
      - files:
        - '/etc/prometheus/targets/*.json'
        refresh_interval: 30s
\`\`\``,
    practiceContent: `# Exercices pratiques - Exporters et intégrations

## Exercice 1 : Déployer Node Exporter

Installez et configurez Node Exporter sur une machine :

\`\`\`bash
# Télécharger et lancer
docker run -d --name node-exporter \\
  --net="host" \\
  --pid="host" \\
  -v "/:/host:ro,rslave" \\
  quay.io/prometheus/node-exporter:latest \\
  --path.rootfs=/host

# Vérifier les métriques
curl http://localhost:9100/metrics | grep node_cpu
\`\`\`

## Exercice 2 : Configurer le Blackbox Exporter

Mettez en place un monitoring HTTP de vos services :

\`\`\`bash
docker run -d --name blackbox-exporter \\
  -p 9115:9115 \\
  -v ./blackbox.yml:/config/blackbox.yml \\
  prom/blackbox-exporter:latest \\
  --config.file=/config/blackbox.yml

# Tester un probe
curl "http://localhost:9115/probe?target=https://example.com&module=http_2xx"
\`\`\`

## Exercice 3 : Écrire un exporter custom

Créez un exporter Python qui expose des métriques business :

\`\`\`python
from prometheus_client import start_http_server, Gauge
import random, time

orders = Gauge('shop_pending_orders', 'Pending orders count')
revenue = Gauge('shop_daily_revenue_euros', 'Daily revenue')

def collect():
    orders.set(random.randint(5, 50))
    revenue.set(random.uniform(1000, 5000))

start_http_server(8000)
while True:
    collect()
    time.sleep(10)
\`\`\`

## Exercice 4 : Service discovery avec fichiers

Configurez la découverte dynamique par fichiers JSON :

\`\`\`json
[
  {"targets": ["app-01:9090", "app-02:9090"], "labels": {"env": "prod", "team": "backend"}},
  {"targets": ["web-01:9100"], "labels": {"env": "prod", "team": "frontend"}}
]
\`\`\``,
    keyPoints: JSON.stringify(['Node Exporter expose les métriques système Linux (CPU, mémoire, disque, réseau)', 'Blackbox Exporter effectue des probes actives HTTP, TCP, DNS et ICMP', 'Le relabeling transforme les métadonnées de service discovery en labels Prometheus', 'Les custom exporters utilisent les bibliothèques client (Python, Go, Java)', 'Les quatre types de métriques sont Counter, Gauge, Histogram et Summary', 'Le service discovery Kubernetes utilise les annotations de pods pour le scraping', 'La file-based discovery permet d\'intégrer des sources externes de cibles', 'Chaque exporter expose un endpoint /metrics au format texte OpenMetrics']),
  },


  // ============================================================
  // GRAFANA - Module 3: Dashboards avancés
  // ============================================================
  {
    id: 'graf-03',
    courseId: 'grafana',
    title: 'Dashboards avancés',
    duration: '3h',
    orderIndex: 3,
    theoryContent: `# Dashboards Avancés Grafana

## 1. Introduction

Grafana offre des fonctionnalités avancées pour créer des dashboards dynamiques et réutilisables. Les variables, annotations, panneaux répétés et transformations permettent de construire des tableaux de bord interactifs qui s'adaptent à différents contextes.

Un dashboard avancé bien conçu :
- Utilise des variables pour filtrer dynamiquement les données
- Emploie des annotations pour marquer les événements importants
- Exploite les panneaux répétés pour éviter la duplication
- Applique des transformations pour enrichir les données

## 2. Variables de dashboard

Les variables rendent les dashboards interactifs et réutilisables :

\`\`\`
# Variable de type Query (Prometheus)
Nom: namespace
Label: Namespace
Query: label_values(kube_pod_info, namespace)
Regex: /^(?!kube-system).*/
Sort: Alphabetical (asc)
Multi-value: true
Include All: true

# Variable dépendante
Nom: pod
Label: Pod
Query: label_values(kube_pod_info{namespace="\\\$namespace"}, pod)
Refresh: On time range change

# Variable de type Custom
Nom: interval
Label: Interval
Values: 1m, 5m, 15m, 1h
Default: 5m

# Variable de type Datasource
Nom: datasource
Label: Source
Type: Prometheus
Regex: /Prometheus.*/
\`\`\`

Utilisation dans les requêtes :

\`\`\`promql
# Utilisation avec multi-value
sum by(pod) (rate(container_cpu_usage_seconds_total{namespace=~"\\\$namespace", pod=~"\\\$pod"}[\\\$interval]))

# Variable dans le titre du panel
CPU Usage - \\\$namespace / \\\$pod
\`\`\`

## 3. Annotations

Les annotations marquent des événements sur les graphiques :

\`\`\`json
{
  "datasource": "Prometheus",
  "enable": true,
  "name": "Deployments",
  "iconColor": "green",
  "expr": "changes(kube_deployment_status_observed_generation{namespace=\\"\\\$namespace\\"}[2m]) > 0",
  "titleFormat": "Deploy: {{deployment}}",
  "textFormat": "Namespace: {{namespace}}"
}
\`\`\`

Annotations via l'API Grafana :

\`\`\`bash
curl -X POST http://grafana:3000/api/annotations \\
  -H "Authorization: Bearer \\\$TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "dashboardUID": "abc123",
    "time": 1234567890000,
    "tags": ["deployment", "v2.1.0"],
    "text": "Déploiement v2.1.0 en production"
  }'
\`\`\`

## 4. Panneaux répétés (Repeated Panels)

Les panneaux répétés génèrent automatiquement un panneau par valeur de variable :

Configuration :
1. Créer une variable multi-value (ex: \`instance\`)
2. Dans les options du panel, activer "Repeat by variable"
3. Choisir la variable et la direction (horizontal/vertical)
4. Le panel est dupliqué automatiquement pour chaque valeur

\`\`\`
Panel Settings:
  Repeat options:
    Repeat by variable: instance
    Direction: Horizontal
    Max per row: 3
\`\`\`

## 5. Transformations de données

Les transformations modifient les données après la requête et avant l'affichage :

\`\`\`
Transformations courantes :

1. Merge - Fusionner plusieurs requêtes en une table
2. Filter by name - Filtrer les séries par nom
3. Organize fields - Réordonner, renommer, masquer des colonnes
4. Add field from calculation - Ajouter des champs calculés
5. Group by - Grouper et agréger des lignes
6. Sort by - Trier les résultats
7. Reduce - Réduire les séries à une seule valeur
8. Join by field - Joindre des résultats sur un champ commun
\`\`\`

Exemple de pipeline de transformations :

\`\`\`
Query A: rate(http_requests_total{status=~"2.."}[5m])  -> "Success"
Query B: rate(http_requests_total{status=~"5.."}[5m])  -> "Errors"

Transformations:
1. Merge (combiner A et B)
2. Add field: "Error Rate" = Errors / (Success + Errors) * 100
3. Organize fields: masquer les colonnes brutes
4. Sort by: Error Rate descending
\`\`\`

## 6. Liens et navigation

\`\`\`json
{
  "links": [
    {
      "title": "Détails du pod",
      "url": "/d/pod-details?var-pod=\\\${__field.labels.pod}&var-namespace=\\\${__field.labels.namespace}",
      "targetBlank": false
    },
    {
      "title": "Logs",
      "url": "/explore?left={\\\"datasource\\\":\\\"Loki\\\",\\\"queries\\\":[{\\\"expr\\\":\\\"{pod=\\\\\\\"\\\${__field.labels.pod}\\\\\\\"}\\\"]}",
      "targetBlank": true
    }
  ]
}
\`\`\``,
    practiceContent: `# Exercices pratiques - Dashboards Avancés

## Exercice 1 : Variables dynamiques

Créez un dashboard avec variables chaînées :

1. Variable \`environment\` : Query \`label_values(up, env)\`
2. Variable \`service\` : Query \`label_values(up{env="\\\$environment"}, job)\`
3. Variable \`instance\` : Query \`label_values(up{env="\\\$environment", job="\\\$service"}, instance)\`

Utilisez-les dans un panel :
\`\`\`promql
rate(http_requests_total{env="\\\$environment", job="\\\$service", instance=~"\\\$instance"}[5m])
\`\`\`

## Exercice 2 : Panneaux répétés

Créez un row répété par namespace avec :
- Panel CPU par pod (repeated by pod)
- Panel Mémoire par pod (repeated by pod)
- Max 4 panels par ligne

## Exercice 3 : Transformations avancées

Créez une table de SLA par service :
1. Query A : disponibilité (uptime ratio)
2. Query B : latence P95
3. Transformation Merge + Add field (SLA status: OK si > 99.9%)
4. Appliquez un override de couleur selon le statut

## Exercice 4 : Annotations de déploiement

Configurez des annotations automatiques :

\`\`\`bash
# Script post-déploiement
curl -X POST http://grafana:3000/api/annotations \\
  -H "Authorization: Bearer glsa_xxx" \\
  -H "Content-Type: application/json" \\
  -d "{
    \\"tags\\": [\\"deploy\\", \\"\\\$SERVICE\\"],
    \\"text\\": \\"Deploy \\\$VERSION par \\\$USER\\"
  }"
\`\`\``,
    keyPoints: JSON.stringify(['Les variables rendent les dashboards dynamiques et réutilisables sans duplication', 'Les variables peuvent être chaînées avec des dépendances entre elles', 'Les annotations marquent visuellement les événements importants sur les graphiques', 'Les panneaux répétés génèrent automatiquement un panel par valeur de variable', 'Les transformations modifient les données entre la requête et l\'affichage', 'Les data links permettent la navigation contextuelle entre dashboards', 'Le provisioning YAML automatise le déploiement de dashboards en tant que code', 'Les overrides permettent de personnaliser l\'affichage par série ou par valeur']),
  },


  // ============================================================
  // GRAFANA - Module 4: Alerting Grafana
  // ============================================================
  {
    id: 'graf-04',
    courseId: 'grafana',
    title: 'Alerting Grafana',
    duration: '3h',
    orderIndex: 4,
    theoryContent: `# Alerting Grafana

## 1. Introduction

Depuis Grafana 9, le système d'alerting a été entièrement repensé avec **Grafana Alerting unifié**. Ce système remplace l'ancien alerting par panel et offre une approche centralisée, multi-datasource, avec des fonctionnalités avancées de routage et de gestion des notifications.

Avantages du nouveau système :
- Alertes indépendantes des dashboards
- Support multi-datasource dans une même règle
- Routage avancé inspiré d'Alertmanager
- Gestion centralisée des contacts et notifications

## 2. Concepts clés

### Architecture de l'alerting Grafana

\`\`\`
┌─────────────────────────────────────────────┐
│              Grafana Alerting                │
├─────────────┬───────────────┬───────────────┤
│ Alert Rules │ Contact Points│  Notification │
│ (conditions)│ (destinations)│  Policies     │
│             │               │  (routage)    │
└──────┬──────┴───────┬───────┴───────┬───────┘
       │              │               │
   Évaluation     Envoi          Routage
   périodique     notifications  par labels
\`\`\`

### États d'une alerte
- **Normal** : la condition n'est pas remplie
- **Pending** : la condition est remplie mais le délai for n'est pas écoulé
- **Alerting** : l'alerte est active et les notifications sont envoyées
- **No Data** : aucune donnée reçue pendant l'évaluation
- **Error** : erreur lors de l'évaluation de la requête

## 3. Créer des règles d'alerte

### Alerte basée sur Prometheus

\`\`\`yaml
# Via provisioning - alert_rules.yml
apiVersion: 1
groups:
  - orgId: 1
    name: Application Alerts
    folder: Production
    interval: 1m
    rules:
      - uid: high-error-rate
        title: High Error Rate
        condition: C
        data:
          - refId: A
            datasourceUid: prometheus
            model:
              expr: sum(rate(http_requests_total{status=~"5.."}[5m]))
              instant: false
          - refId: B
            datasourceUid: prometheus
            model:
              expr: sum(rate(http_requests_total[5m]))
              instant: false
          - refId: C
            datasourceUid: __expr__
            model:
              type: math
              expression: "\\\$A / \\\$B > 0.05"
        for: 5m
        labels:
          severity: critical
          team: backend
        annotations:
          summary: "Taux d'erreur supérieur à 5%"
          runbook_url: "https://wiki.company.com/runbooks/high-error-rate"
\`\`\`

### Alerte multi-datasource

\`\`\`yaml
rules:
  - uid: correlation-alert
    title: High CPU with Slow Queries
    condition: D
    data:
      - refId: A
        datasourceUid: prometheus
        model:
          expr: avg(rate(node_cpu_seconds_total{mode="idle"}[5m])) < 0.2
      - refId: B
        datasourceUid: mysql
        model:
          rawSql: "SELECT COUNT(*) as slow FROM slow_log WHERE start_time > NOW() - INTERVAL 5 MINUTE"
      - refId: D
        datasourceUid: __expr__
        model:
          type: math
          expression: "\\\$A && \\\$B > 10"
\`\`\`

## 4. Contact Points

Les contact points définissent les destinataires des notifications :

\`\`\`yaml
# contact_points.yml
apiVersion: 1
contactPoints:
  - orgId: 1
    name: Slack Engineering
    receivers:
      - uid: slack-eng
        type: slack
        settings:
          url: "https://hooks.slack.com/services/xxx"
          recipient: "#engineering-alerts"
          title: |
            [{{ .Status | toUpper }}] {{ .Labels.alertname }}
          text: |
            {{ range .Alerts }}
            *{{ .Labels.severity }}* - {{ .Annotations.summary }}
            {{ end }}
        disableResolveMessage: false

  - orgId: 1
    name: PagerDuty On-Call
    receivers:
      - uid: pd-oncall
        type: pagerduty
        settings:
          integrationKey: "<key>"
          severity: "{{ .Labels.severity }}"
          class: "{{ .Labels.team }}"

  - orgId: 1
    name: Email Team
    receivers:
      - uid: email-team
        type: email
        settings:
          addresses: "team@company.com"
          singleEmail: true
\`\`\`

## 5. Notification Policies

Les politiques de notification routent les alertes vers les bons contact points :

\`\`\`yaml
# notification_policies.yml
apiVersion: 1
policies:
  - orgId: 1
    receiver: Email Team
    group_by: ['alertname', 'team']
    group_wait: 30s
    group_interval: 5m
    repeat_interval: 4h
    routes:
      - receiver: PagerDuty On-Call
        matchers:
          - severity = critical
        group_wait: 10s
        mute_time_intervals:
          - weekends
      - receiver: Slack Engineering
        matchers:
          - team = engineering
        continue: true

# Mute timings
muteTimes:
  - orgId: 1
    name: weekends
    time_intervals:
      - weekdays: [saturday, sunday]
      - times:
        - start_time: "00:00"
          end_time: "08:00"
\`\`\`

## 6. Bonnes pratiques

- Toujours définir un \`runbook_url\` dans les annotations
- Utiliser des labels cohérents pour le routage (severity, team, service)
- Configurer les mute timings pour éviter les alertes nocturnes non critiques
- Tester les notifications avec le bouton "Test" avant la mise en production
- Utiliser le provisioning pour versionner la configuration d'alerting`,
    practiceContent: `# Exercices pratiques - Alerting Grafana

## Exercice 1 : Créer une alerte multi-condition

Configurez une alerte qui se déclenche quand :
- Le taux d'erreur dépasse 5% ET la latence P95 dépasse 2s

\`\`\`yaml
data:
  - refId: A
    model:
      expr: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m]))
  - refId: B
    model:
      expr: histogram_quantile(0.95, sum by(le)(rate(http_request_duration_seconds_bucket[5m])))
  - refId: C
    datasourceUid: __expr__
    model:
      type: math
      expression: "\\\$A > 0.05 && \\\$B > 2"
\`\`\`

## Exercice 2 : Configurer les contact points

Mettez en place un contact point Slack avec template personnalisé :

\`\`\`yaml
contactPoints:
  - name: Slack Ops
    receivers:
      - type: slack
        settings:
          url: "https://hooks.slack.com/services/xxx"
          title: "{{ .Labels.alertname }} - {{ .Status }}"
          text: "Severity: {{ .Labels.severity }}\\nService: {{ .Labels.service }}"
\`\`\`

## Exercice 3 : Notification policies et routage

Configurez un routage avec escalade :
1. Warning -> Slack (délai 5min)
2. Critical -> PagerDuty (délai 10s)
3. Mute pendant les weekends pour les warnings

## Exercice 4 : Provisionner l'alerting complet

Créez la structure de provisioning :

\`\`\`bash
grafana/provisioning/alerting/
├── alert_rules.yml
├── contact_points.yml
├── notification_policies.yml
└── mute_timings.yml
\`\`\``,
    keyPoints: JSON.stringify(['Le système d\'alerting unifié de Grafana est indépendant des dashboards', 'Les règles d\'alerte peuvent combiner plusieurs datasources avec des expressions math', 'Les contact points définissent les destinataires (Slack, PagerDuty, email, webhooks)', 'Les notification policies routent les alertes par labels vers les bons contact points', 'Les mute timings permettent de désactiver les notifications à certaines heures', 'Le provisioning YAML permet de versionner toute la configuration d\'alerting', 'Les templates Go personnalisent le contenu des notifications', 'Les états No Data et Error doivent être configurés explicitement pour chaque règle']),
  },


  // ============================================================
  // GRAFANA - Module 5: Data sources et plugins
  // ============================================================
  {
    id: 'graf-05',
    courseId: 'grafana',
    title: 'Data sources et plugins',
    duration: '3h',
    orderIndex: 5,
    theoryContent: `# Data Sources et Plugins Grafana

## 1. Introduction

Grafana est une plateforme d'observabilité qui brille par sa capacité à connecter de **multiples sources de données**. Au-delà de Prometheus, Grafana supporte nativement des dizaines de datasources : Loki pour les logs, Tempo pour les traces, InfluxDB, Elasticsearch, PostgreSQL, et bien d'autres.

Le système de plugins étend encore les capacités avec des panels personnalisés, des datasources tierces et des applications complètes.

## 2. Loki - Logs

Loki est le système de logs de Grafana Labs, conçu pour être efficace et s'intégrer parfaitement avec Grafana :

\`\`\`yaml
# Datasource Loki provisioning
apiVersion: 1
datasources:
  - name: Loki
    type: loki
    access: proxy
    url: http://loki:3100
    jsonData:
      maxLines: 1000
      derivedFields:
        - datasourceUid: tempo
          matcherRegex: "traceID=(\\\\w+)"
          name: TraceID
          url: "\\\${__value.raw}"

# Requêtes LogQL
# Filtrer les logs par label
{namespace="production", app="api"} |= "error"

# Pipeline de parsing
{app="nginx"} | json | status >= 400 | line_format "{{.status}} {{.path}}"

# Métriques depuis les logs
sum(rate({app="api"} |= "error" [5m])) by (level)

# Patterns
{app="api"} | pattern "<ip> - - [<timestamp>] \\"<method> <path> <_>\\" <status> <size>"
  | status >= 500
\`\`\`

## 3. Tempo - Traces distribuées

Tempo stocke et interroge les traces distribuées (compatible OpenTelemetry, Jaeger, Zipkin) :

\`\`\`yaml
# Datasource Tempo provisioning
datasources:
  - name: Tempo
    type: tempo
    access: proxy
    url: http://tempo:3200
    jsonData:
      tracesToLogsV2:
        datasourceUid: loki
        filterByTraceID: true
        filterBySpanID: true
      tracesToMetrics:
        datasourceUid: prometheus
        queries:
          - name: "Request rate"
            query: "sum(rate(http_requests_total{\\\$__tags}[5m]))"
      serviceMap:
        datasourceUid: prometheus
      nodeGraph:
        enabled: true
      lokiSearch:
        datasourceUid: loki
\`\`\`

Requêtes TraceQL :

\`\`\`
# Trouver les traces lentes
{ duration > 2s }

# Filtrer par service et statut
{ span.http.status_code >= 500 && resource.service.name = "api-gateway" }

# Traces avec erreurs sur un endpoint spécifique
{ span.http.url =~ "/api/v1/users.*" && status = error }
\`\`\`

## 4. Multiple Prometheus et federation

\`\`\`yaml
# Provisioning multi-Prometheus
datasources:
  - name: Prometheus Production
    type: prometheus
    access: proxy
    url: http://prometheus-prod:9090
    jsonData:
      httpMethod: POST
      timeInterval: "15s"
      exemplarTraceIdDestinations:
        - name: traceID
          datasourceUid: tempo

  - name: Prometheus Staging
    type: prometheus
    access: proxy
    url: http://prometheus-staging:9090
    jsonData:
      timeInterval: "30s"

  - name: Thanos Global
    type: prometheus
    access: proxy
    url: http://thanos-query:9090
    jsonData:
      customQueryParameters: "dedup=true&partial_response=true"
\`\`\`

## 5. Provisioning complet

Structure de provisioning pour déployer Grafana as Code :

\`\`\`bash
grafana/
├── provisioning/
│   ├── datasources/
│   │   ├── prometheus.yml
│   │   ├── loki.yml
│   │   └── tempo.yml
│   ├── dashboards/
│   │   ├── provider.yml
│   │   └── json/
│   │       ├── overview.json
│   │       └── services.json
│   ├── alerting/
│   │   ├── rules.yml
│   │   └── contacts.yml
│   └── plugins/
│       └── apps.yml
└── grafana.ini
\`\`\`

\`\`\`yaml
# dashboards/provider.yml
apiVersion: 1
providers:
  - name: 'default'
    orgId: 1
    folder: 'Provisioned'
    type: file
    disableDeletion: true
    updateIntervalSeconds: 30
    options:
      path: /var/lib/grafana/dashboards
      foldersFromFilesStructure: true
\`\`\`

## 6. Installation et gestion des plugins

\`\`\`bash
# Installer un plugin via CLI
grafana-cli plugins install grafana-piechart-panel
grafana-cli plugins install grafana-worldmap-panel
grafana-cli plugins install alexanderzobnin-zabbix-app

# Installer depuis une URL custom
grafana-cli --pluginUrl https://company.com/plugin.zip plugins install custom-plugin

# Via variable d'environnement (Docker)
GF_INSTALL_PLUGINS=grafana-clock-panel,grafana-piechart-panel

# Docker Compose
environment:
  - GF_INSTALL_PLUGINS=grafana-piechart-panel;grafana-worldmap-panel
\`\`\`

Plugins recommandés :
- **grafana-piechart-panel** : graphiques en secteurs
- **grafana-worldmap-panel** : cartographie géographique
- **grafana-polystat-panel** : statuts multiples hexagonaux
- **yesoreyeram-infinity-datasource** : requêter des APIs REST arbitraires`,
    practiceContent: `# Exercices pratiques - Data Sources et Plugins

## Exercice 1 : Connecter Loki et corréler logs/métriques

Configurez Loki et créez un dashboard corrélé :

\`\`\`yaml
# docker-compose.yml (extrait)
services:
  loki:
    image: grafana/loki:2.9.0
    ports:
      - "3100:3100"
    command: -config.file=/etc/loki/local-config.yaml

  promtail:
    image: grafana/promtail:2.9.0
    volumes:
      - /var/log:/var/log
\`\`\`

Testez la corrélation métriques -> logs dans Grafana.

## Exercice 2 : Configurer Tempo pour le tracing

Déployez Tempo et visualisez les traces :

\`\`\`yaml
datasources:
  - name: Tempo
    type: tempo
    url: http://tempo:3200
    jsonData:
      tracesToLogsV2:
        datasourceUid: loki
\`\`\`

## Exercice 3 : Provisioning as Code

Créez une configuration de provisioning complète :

\`\`\`bash
mkdir -p grafana/provisioning/{datasources,dashboards/json,alerting}

# Créez les fichiers YAML de provisioning
# Déployez avec Docker Compose
docker-compose up -d grafana
\`\`\`

## Exercice 4 : Plugin custom datasource

Installez le plugin Infinity et interrogez une API REST :

\`\`\`bash
grafana-cli plugins install yesoreyeram-infinity-datasource

# Configurez une requête vers votre API
# URL: https://api.company.com/metrics
# Type: JSON
# Parser: Backend
\`\`\``,
    keyPoints: JSON.stringify(['Loki utilise LogQL pour interroger les logs avec un modèle similaire à PromQL', 'Tempo stocke les traces distribuées compatibles OpenTelemetry, Jaeger et Zipkin', 'La corrélation logs-métriques-traces unifie l\'observabilité dans une seule interface', 'Le provisioning YAML déploie datasources, dashboards et alerting en tant que code', 'Les derived fields de Loki créent des liens automatiques vers les traces Tempo', 'Le multi-Prometheus avec Thanos permet une vue globale cross-cluster', 'Les plugins étendent Grafana avec des panels, datasources et applications supplémentaires', 'Le mode proxy protège les credentials des datasources côté serveur Grafana']),
  },


  // ============================================================
  // HELM - Module 3: Écrire des Charts Helm
  // ============================================================
  {
    id: 'helm-03',
    courseId: 'helm',
    title: 'Écrire des Charts Helm',
    duration: '3h',
    orderIndex: 3,
    theoryContent: `# Écrire des Charts Helm

## 1. Introduction

Un **Chart Helm** est un package contenant toutes les ressources Kubernetes nécessaires pour déployer une application. Écrire des charts personnalisés permet de créer des déploiements reproductibles, configurables et partageables.

La maîtrise des templates Helm (basés sur Go templates) est essentielle pour créer des charts flexibles et maintenables.

## 2. Structure d'un Chart

\`\`\`bash
mychart/
├── Chart.yaml          # Métadonnées du chart
├── values.yaml         # Valeurs par défaut
├── charts/             # Sous-charts (dépendances)
├── templates/          # Templates Kubernetes
│   ├── _helpers.tpl    # Fonctions helper réutilisables
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── configmap.yaml
│   ├── hpa.yaml
│   ├── NOTES.txt       # Message post-installation
│   └── tests/
│       └── test-connection.yaml
├── .helmignore         # Fichiers à ignorer
└── README.md
\`\`\`

\`\`\`yaml
# Chart.yaml
apiVersion: v2
name: myapp
description: Application web avec API et base de données
type: application
version: 1.2.0
appVersion: "3.1.0"
keywords:
  - web
  - api
maintainers:
  - name: DevOps Team
    email: devops@company.com
\`\`\`

## 3. Templates et fonctions

### Syntaxe de base

\`\`\`yaml
# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "myapp.fullname" . }}
  labels:
    {{- include "myapp.labels" . | nindent 4 }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      {{- include "myapp.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      annotations:
        checksum/config: {{ include (print .Template.BasePath "/configmap.yaml") . | sha256sum }}
      labels:
        {{- include "myapp.selectorLabels" . | nindent 8 }}
    spec:
      {{- with .Values.imagePullSecrets }}
      imagePullSecrets:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          ports:
            - name: http
              containerPort: {{ .Values.service.targetPort | default 8080 }}
          {{- if .Values.resources }}
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
          {{- end }}
          {{- if .Values.env }}
          env:
            {{- range .Values.env }}
            - name: {{ .name }}
              value: {{ .value | quote }}
            {{- end }}
          {{- end }}
\`\`\`

### Helpers (_helpers.tpl)

\`\`\`yaml
# templates/_helpers.tpl
{{- define "myapp.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "myapp.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- \\\$name := default .Chart.Name .Values.nameOverride }}
{{- printf "%s-%s" .Release.Name \\\$name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}

{{- define "myapp.labels" -}}
helm.sh/chart: {{ include "myapp.chart" . }}
{{ include "myapp.selectorLabels" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}

{{- define "myapp.selectorLabels" -}}
app.kubernetes.io/name: {{ include "myapp.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
\`\`\`

## 4. Conditionnels et boucles

\`\`\`yaml
# Conditionnel - Ingress optionnel
{{- if .Values.ingress.enabled }}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: {{ include "myapp.fullname" . }}
  {{- with .Values.ingress.annotations }}
  annotations:
    {{- toYaml . | nindent 4 }}
  {{- end }}
spec:
  {{- if .Values.ingress.tls }}
  tls:
    {{- range .Values.ingress.tls }}
    - hosts:
        {{- range .hosts }}
        - {{ . | quote }}
        {{- end }}
      secretName: {{ .secretName }}
    {{- end }}
  {{- end }}
  rules:
    {{- range .Values.ingress.hosts }}
    - host: {{ .host | quote }}
      http:
        paths:
          {{- range .paths }}
          - path: {{ .path }}
            pathType: {{ .pathType }}
            backend:
              service:
                name: {{ include "myapp.fullname" \\\$ }}
                port:
                  number: {{ .port | default 80 }}
          {{- end }}
    {{- end }}
{{- end }}
\`\`\`

## 5. Hooks Helm

Les hooks exécutent des actions à des moments précis du cycle de vie :

\`\`\`yaml
# templates/pre-install-job.yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: {{ include "myapp.fullname" . }}-db-migrate
  annotations:
    "helm.sh/hook": pre-install,pre-upgrade
    "helm.sh/hook-weight": "-5"
    "helm.sh/hook-delete-policy": before-hook-creation
spec:
  template:
    spec:
      containers:
        - name: migrate
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          command: ["./migrate", "up"]
      restartPolicy: Never
  backoffLimit: 3
\`\`\`

## 6. Values et validation

\`\`\`yaml
# values.yaml
replicaCount: 2

image:
  repository: registry.company.com/myapp
  tag: ""
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80
  targetPort: 8080

ingress:
  enabled: false
  annotations: {}
  hosts:
    - host: myapp.local
      paths:
        - path: /
          pathType: Prefix

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 100m
    memory: 128Mi
\`\`\``,
    practiceContent: `# Exercices pratiques - Écrire des Charts Helm

## Exercice 1 : Créer un chart de base

\`\`\`bash
# Scaffolding
helm create webapp
cd webapp

# Nettoyer les fichiers inutiles
rm templates/tests/*.yaml
rm templates/hpa.yaml templates/serviceaccount.yaml

# Personnaliser values.yaml et templates
helm template . --debug | less

# Valider le chart
helm lint .
\`\`\`

## Exercice 2 : Implémenter des helpers avancés

Ajoutez dans _helpers.tpl :

\`\`\`yaml
{{- define "myapp.env" -}}
{{- range \\\$key, \\\$value := .Values.config }}
- name: {{ \\\$key | upper }}
  value: {{ \\\$value | quote }}
{{- end }}
{{- end }}
\`\`\`

## Exercice 3 : Chart avec hooks de migration

Créez un hook pre-upgrade pour les migrations de base de données :

\`\`\`yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: "{{ .Release.Name }}-migrate"
  annotations:
    "helm.sh/hook": pre-upgrade
    "helm.sh/hook-delete-policy": hook-succeeded
spec:
  template:
    spec:
      containers:
        - name: migrate
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          command: ["npm", "run", "migrate"]
      restartPolicy: Never
\`\`\`

## Exercice 4 : Tester le chart

\`\`\`bash
# Render en local
helm template myrelease . -f values-prod.yaml

# Dry-run sur le cluster
helm install --dry-run --debug myrelease .

# Installer
helm install myrelease . -n production --create-namespace
\`\`\``,
    keyPoints: JSON.stringify(['Un chart Helm contient Chart.yaml, values.yaml, et un dossier templates/', 'Les helpers dans _helpers.tpl centralisent les fonctions réutilisables', 'Les fonctions include, toYaml et nindent sont les plus utilisées dans les templates', 'Les conditionnels if/else et boucles range rendent les charts dynamiques', 'Les hooks pre-install, pre-upgrade exécutent des jobs à des moments précis du cycle de vie', 'La directive with change le scope du contexte pour simplifier les accès imbriqués', 'helm lint et helm template --debug aident à déboguer les templates', 'Le checksum/config dans les annotations force le redémarrage des pods quand la config change']),
  },


  // ============================================================
  // HELM - Module 4: Gestion des dépendances
  // ============================================================
  {
    id: 'helm-04',
    courseId: 'helm',
    title: 'Gestion des dépendances',
    duration: '3h',
    orderIndex: 4,
    theoryContent: `# Gestion des Dépendances Helm

## 1. Introduction

Les charts Helm supportent les **dépendances** (subcharts), permettant de composer des applications complexes à partir de charts réutilisables. Par exemple, une application web peut dépendre de charts PostgreSQL, Redis et Elasticsearch sans redéfinir leur configuration.

La gestion des dépendances permet de :
- Réutiliser des charts communautaires éprouvés
- Composer des stacks applicatives complètes
- Partager des valeurs entre charts parent et enfants
- Activer/désactiver des composants conditionnellement

## 2. Déclarer les dépendances

Les dépendances sont déclarées dans Chart.yaml :

\`\`\`yaml
# Chart.yaml
apiVersion: v2
name: myapp
version: 1.0.0
appVersion: "2.0.0"
dependencies:
  - name: postgresql
    version: "13.2.0"
    repository: "https://charts.bitnami.com/bitnami"
    condition: postgresql.enabled
    tags:
      - database

  - name: redis
    version: "18.4.0"
    repository: "https://charts.bitnami.com/bitnami"
    condition: redis.enabled
    tags:
      - cache

  - name: elasticsearch
    version: "19.13.0"
    repository: "https://charts.bitnami.com/bitnami"
    condition: elasticsearch.enabled
    alias: search
    tags:
      - search

  - name: common
    version: "2.x.x"
    repository: "https://charts.bitnami.com/bitnami"
    tags:
      - bitnami-common
\`\`\`

## 3. Commandes de gestion

\`\`\`bash
# Télécharger les dépendances
helm dependency update ./myapp

# Lister les dépendances
helm dependency list ./myapp

# Rebuild le lock file
helm dependency build ./myapp

# Structure après update
myapp/
├── Chart.yaml
├── Chart.lock          # Versions exactes verrouillées
├── charts/
│   ├── postgresql-13.2.0.tgz
│   ├── redis-18.4.0.tgz
│   └── elasticsearch-19.13.0.tgz
└── ...
\`\`\`

## 4. Configuration des subcharts

Les values du parent peuvent configurer les subcharts :

\`\`\`yaml
# values.yaml du chart parent
# Configuration de l'application principale
replicaCount: 3
image:
  repository: myapp
  tag: "2.0.0"

# Configuration du subchart postgresql
postgresql:
  enabled: true
  auth:
    username: myapp
    password: secret123
    database: myapp_db
  primary:
    persistence:
      size: 20Gi
    resources:
      limits:
        memory: 1Gi
        cpu: "1"

# Configuration du subchart redis
redis:
  enabled: true
  architecture: standalone
  auth:
    enabled: true
    password: redis-secret
  master:
    persistence:
      size: 5Gi

# Configuration d'elasticsearch (via alias 'search')
search:
  enabled: false
  master:
    replicaCount: 1

# Tags pour activer/désactiver des groupes
tags:
  database: true
  cache: true
  search: false
\`\`\`

## 5. Global Values

Les valeurs globales sont accessibles par tous les subcharts :

\`\`\`yaml
# values.yaml
global:
  imageRegistry: registry.company.com
  imagePullSecrets:
    - name: registry-creds
  storageClass: "fast-ssd"
  environment: production
  domain: company.com

# Accès dans un subchart
# .Values.global.imageRegistry
# .Values.global.storageClass
\`\`\`

\`\`\`yaml
# Dans un template de subchart
image: {{ .Values.global.imageRegistry }}/{{ .Values.image.repository }}:{{ .Values.image.tag }}

# PVC avec storageClass globale
storageClassName: {{ .Values.global.storageClass }}
\`\`\`

## 6. Import-Values et Export-Values

\`\`\`yaml
# Chart.yaml - importer des valeurs d'un subchart
dependencies:
  - name: postgresql
    version: "13.2.0"
    repository: "https://charts.bitnami.com/bitnami"
    import-values:
      - child: primary.service
        parent: database

# Résultat : .Values.database.port, .Values.database.type, etc.
\`\`\`

## 7. Subcharts locaux

Les subcharts peuvent être développés localement :

\`\`\`yaml
# Chart.yaml avec subchart local
dependencies:
  - name: common-lib
    version: "1.0.0"
    repository: "file://../common-lib"

  - name: auth-service
    version: "2.0.0"
    repository: "file://./charts/auth-service"
\`\`\`

\`\`\`bash
# Structure avec subcharts locaux
myapp/
├── Chart.yaml
├── charts/
│   └── auth-service/
│       ├── Chart.yaml
│       ├── values.yaml
│       └── templates/
│           └── deployment.yaml
└── templates/
    └── ...
\`\`\`

## 8. Bonnes pratiques

- Toujours utiliser \`condition\` pour rendre les dépendances optionnelles
- Préférer les alias quand plusieurs instances du même chart sont nécessaires
- Utiliser Chart.lock pour garantir la reproductibilité
- Documenter les valeurs des subcharts dans values.yaml avec des commentaires
- Tester avec \`helm template\` avant de déployer
- Utiliser les global values pour les paramètres partagés (registry, storageClass)`,
    practiceContent: `# Exercices pratiques - Gestion des dépendances

## Exercice 1 : Application avec PostgreSQL et Redis

Créez un chart avec dépendances :

\`\`\`bash
helm create fullstack-app
cd fullstack-app

# Ajouter les dépendances dans Chart.yaml
# Puis télécharger
helm dependency update .

# Vérifier
helm dependency list .
ls charts/
\`\`\`

## Exercice 2 : Configuration des subcharts

Configurez les subcharts via values.yaml :

\`\`\`yaml
postgresql:
  enabled: true
  auth:
    username: app
    database: app_db
  primary:
    persistence:
      size: 10Gi

redis:
  enabled: true
  architecture: standalone
\`\`\`

Testez : \`helm template myrelease . | grep -A5 "kind: StatefulSet"\`

## Exercice 3 : Global values et multi-environnement

Créez des fichiers values par environnement :

\`\`\`bash
# values-dev.yaml
global:
  environment: development
  storageClass: standard
postgresql:
  primary:
    persistence:
      size: 1Gi

# values-prod.yaml
global:
  environment: production
  storageClass: fast-ssd
postgresql:
  primary:
    persistence:
      size: 50Gi
    resources:
      limits:
        memory: 4Gi
\`\`\`

## Exercice 4 : Subchart local

Créez un library chart local :

\`\`\`bash
mkdir -p charts/shared-config
# Créez Chart.yaml (type: library) et _helpers.tpl
# Référencez avec repository: "file://./charts/shared-config"
helm dependency update .
\`\`\``,
    keyPoints: JSON.stringify(['Les dépendances sont déclarées dans Chart.yaml et téléchargées dans charts/', 'Chart.lock verrouille les versions exactes pour la reproductibilité des builds', 'La clé condition permet d\'activer/désactiver une dépendance via une valeur booléenne', 'Les tags groupent plusieurs dépendances sous un même interrupteur', 'Les global values sont accessibles par tous les subcharts sans préfixe', 'L\'alias permet d\'utiliser plusieurs instances du même chart avec des noms différents', 'Les subcharts locaux avec repository file:// facilitent le développement de monorepos', 'import-values remonte des valeurs d\'un subchart vers le chart parent']),
  },


  // ============================================================
  // HELM - Module 5: Helm en production
  // ============================================================
  {
    id: 'helm-05',
    courseId: 'helm',
    title: 'Helm en production',
    duration: '3h',
    orderIndex: 5,
    theoryContent: `# Helm en Production

## 1. Introduction

Utiliser Helm en production nécessite des pratiques avancées : registries OCI pour stocker les charts, signature pour la sécurité, tests automatisés, intégration CI/CD et outils comme Helmfile pour gérer de multiples releases.

Ces pratiques garantissent la fiabilité, la sécurité et la reproductibilité des déploiements Kubernetes à grande échelle.

## 2. OCI Registry pour les Charts

Depuis Helm 3.8, le support OCI (Open Container Initiative) est stable. Les charts sont stockés comme des artefacts OCI dans un registry de conteneurs :

\`\`\`bash
# Authentification au registry
helm registry login registry.company.com -u admin -p secret

# Packager un chart
helm package ./mychart
# Résultat : mychart-1.2.0.tgz

# Pousser vers un registry OCI
helm push mychart-1.2.0.tgz oci://registry.company.com/charts

# Installer depuis OCI
helm install myrelease oci://registry.company.com/charts/mychart --version 1.2.0

# Lister les tags disponibles
helm show all oci://registry.company.com/charts/mychart

# Pull un chart OCI
helm pull oci://registry.company.com/charts/mychart --version 1.2.0 --untar
\`\`\`

## 3. Signature et vérification

Helm supporte la signature des charts avec GPG/Cosign pour garantir l'intégrité :

\`\`\`bash
# Générer une clé GPG
gpg --gen-key

# Signer un chart lors du packaging
helm package --sign --key "DevOps Team" --keyring ~/.gnupg/secring.gpg ./mychart
# Produit : mychart-1.2.0.tgz et mychart-1.2.0.tgz.prov

# Vérifier la signature
helm verify mychart-1.2.0.tgz --keyring pubkeys.gpg

# Installer avec vérification
helm install --verify --keyring pubkeys.gpg myrelease mychart-1.2.0.tgz

# Alternative avec Cosign (Sigstore)
cosign sign --key cosign.key registry.company.com/charts/mychart:1.2.0
cosign verify --key cosign.pub registry.company.com/charts/mychart:1.2.0
\`\`\`

## 4. Tests Helm

### Tests intégrés

\`\`\`yaml
# templates/tests/test-connection.yaml
apiVersion: v1
kind: Pod
metadata:
  name: "{{ include "myapp.fullname" . }}-test"
  annotations:
    "helm.sh/hook": test
    "helm.sh/hook-delete-policy": before-hook-creation
spec:
  containers:
    - name: wget
      image: busybox
      command: ['wget']
      args: ['{{ include "myapp.fullname" . }}:{{ .Values.service.port }}/health']
  restartPolicy: Never
\`\`\`

\`\`\`bash
# Exécuter les tests
helm test myrelease
helm test myrelease --logs
\`\`\`

### Tests avec chart-testing (ct)

\`\`\`bash
# Installer chart-testing
pip install chart-testing

# Lint tous les charts modifiés
ct lint --config ct.yaml --charts charts/

# Test d'installation complet
ct install --config ct.yaml --charts charts/

# ct.yaml
chart-dirs:
  - charts
target-branch: main
helm-extra-args: "--timeout 300s"
\`\`\`

## 5. Intégration CI/CD

### GitLab CI

\`\`\`yaml
# .gitlab-ci.yml
stages:
  - lint
  - package
  - deploy

helm-lint:
  stage: lint
  image: alpine/helm:3.14
  script:
    - helm lint charts/myapp
    - helm template myrelease charts/myapp -f values-prod.yaml

helm-package:
  stage: package
  image: alpine/helm:3.14
  script:
    - helm package charts/myapp --version \\\${CI_COMMIT_TAG}
    - helm push myapp-\\\${CI_COMMIT_TAG}.tgz oci://\\\${CI_REGISTRY}/charts
  only:
    - tags

helm-deploy:
  stage: deploy
  image: alpine/helm:3.14
  script:
    - helm upgrade --install myapp oci://\\\${CI_REGISTRY}/charts/myapp
      --version \\\${CI_COMMIT_TAG}
      --namespace production
      -f values-prod.yaml
      --wait --timeout 5m
  environment:
    name: production
  when: manual
\`\`\`

## 6. Helmfile

Helmfile gère de multiples releases Helm de manière déclarative :

\`\`\`yaml
# helmfile.yaml
repositories:
  - name: bitnami
    url: https://charts.bitnami.com/bitnami
  - name: prometheus
    url: https://prometheus-community.github.io/helm-charts

environments:
  dev:
    values:
      - environments/dev.yaml
  production:
    values:
      - environments/production.yaml

releases:
  - name: prometheus
    namespace: monitoring
    chart: prometheus/kube-prometheus-stack
    version: 55.0.0
    values:
      - values/prometheus.yaml
      - values/prometheus-{{ .Environment.Name }}.yaml

  - name: myapp
    namespace: "{{ .Values.namespace }}"
    chart: ./charts/myapp
    values:
      - values/myapp.yaml
      - values/myapp-{{ .Environment.Name }}.yaml
    set:
      - name: image.tag
        value: "{{ requiredEnv \"APP_VERSION\" }}"
    needs:
      - monitoring/prometheus
\`\`\`

\`\`\`bash
# Commandes Helmfile
helmfile -e production diff
helmfile -e production apply
helmfile -e production sync
helmfile -e production destroy
helmfile -e production status
\`\`\``,
    practiceContent: `# Exercices pratiques - Helm en production

## Exercice 1 : Publier sur un registry OCI

\`\`\`bash
# Démarrer un registry local
docker run -d -p 5000:5000 registry:2

# Packager et pousser
helm package ./myapp
helm push myapp-1.0.0.tgz oci://localhost:5000/charts

# Installer depuis le registry
helm install test oci://localhost:5000/charts/myapp --version 1.0.0
\`\`\`

## Exercice 2 : Tests automatisés

Ajoutez des tests à votre chart :

\`\`\`yaml
# templates/tests/test-api.yaml
apiVersion: v1
kind: Pod
metadata:
  name: "{{ .Release.Name }}-api-test"
  annotations:
    "helm.sh/hook": test
spec:
  containers:
    - name: test
      image: curlimages/curl
      command: ['curl', '-sf', 'http://{{ .Release.Name }}:{{ .Values.service.port }}/health']
  restartPolicy: Never
\`\`\`

Exécutez : \`helm test myrelease --logs\`

## Exercice 3 : Pipeline CI/CD complet

Créez un pipeline qui lint, package et déploie :

\`\`\`bash
# Script de déploiement
helm upgrade --install myapp ./charts/myapp \\
  --namespace production \\
  --set image.tag=\\\$GIT_SHA \\
  --wait --timeout 300s \\
  --atomic
\`\`\`

## Exercice 4 : Helmfile multi-environnement

\`\`\`bash
# Installer helmfile
# Créer la structure
mkdir -p environments values
# Appliquer
helmfile -e dev diff
helmfile -e dev apply
\`\`\``,
    keyPoints: JSON.stringify(['Les registries OCI stockent les charts Helm comme des artefacts de conteneurs standards', 'La signature GPG ou Cosign garantit l\'intégrité et l\'authenticité des charts', 'helm test exécute des pods de validation post-déploiement dans le cluster', 'chart-testing (ct) automatise le lint et les tests d\'installation dans les pipelines CI', 'Le flag --atomic annule automatiquement un déploiement en cas d\'échec', 'Helmfile gère de multiples releases avec support d\'environnements et de dépendances', 'Les hooks post-install et post-upgrade exécutent des validations après déploiement', 'La stratégie helm upgrade --install est idempotente et fonctionne pour les créations et mises à jour']),
  },


  // ============================================================
  // ARGOCD - Module 3: Sync et stratégies
  // ============================================================
  {
    id: 'argo-03',
    courseId: 'argocd',
    title: 'Sync et stratégies',
    duration: '3h',
    orderIndex: 3,
    theoryContent: `# Sync et Stratégies ArgoCD

## 1. Introduction

La synchronisation est au coeur d'ArgoCD. Elle assure que l'état réel du cluster Kubernetes correspond à l'état désiré défini dans Git. ArgoCD offre de multiples stratégies de synchronisation, des hooks pour orchestrer les déploiements, et des health checks pour valider l'état des ressources.

Maîtriser ces mécanismes permet de :
- Contrôler précisément le moment et l'ordre des déploiements
- Exécuter des actions pré/post déploiement (migrations, tests)
- Gérer la suppression des ressources obsolètes
- Valider la santé des déploiements avant de continuer

## 2. Sync Policies

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/company/k8s-manifests.git
    path: apps/myapp/overlays/production
    targetRevision: main
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true           # Supprimer les ressources absentes de Git
      selfHeal: true        # Corriger les drifts manuels
      allowEmpty: false     # Ne pas sync si aucune ressource
    syncOptions:
      - CreateNamespace=true
      - PrunePropagationPolicy=foreground
      - PruneLast=true
      - ApplyOutOfSyncOnly=true
      - ServerSideApply=true
      - RespectIgnoreDifferences=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m
\`\`\`

## 3. Sync Waves et ordering

Les waves contrôlent l'ordre de synchronisation des ressources :

\`\`\`yaml
# Namespace d'abord (wave -1)
apiVersion: v1
kind: Namespace
metadata:
  name: production
  annotations:
    argocd.argoproj.io/sync-wave: "-1"

---
# ConfigMap et Secrets (wave 0 - défaut)
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  annotations:
    argocd.argoproj.io/sync-wave: "0"

---
# Base de données (wave 1)
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  annotations:
    argocd.argoproj.io/sync-wave: "1"

---
# Application (wave 2)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
  annotations:
    argocd.argoproj.io/sync-wave: "2"

---
# Ingress en dernier (wave 3)
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-ingress
  annotations:
    argocd.argoproj.io/sync-wave: "3"
\`\`\`

## 4. Resource Hooks

Les hooks exécutent des actions à des phases précises :

\`\`\`yaml
# Hook PreSync - Migration de base de données
apiVersion: batch/v1
kind: Job
metadata:
  name: db-migrate
  annotations:
    argocd.argoproj.io/hook: PreSync
    argocd.argoproj.io/hook-delete-policy: BeforeHookCreation
    argocd.argoproj.io/sync-wave: "-1"
spec:
  template:
    spec:
      containers:
        - name: migrate
          image: myapp:latest
          command: ["./migrate", "up"]
      restartPolicy: Never
  backoffLimit: 3

---
# Hook PostSync - Tests de smoke
apiVersion: batch/v1
kind: Job
metadata:
  name: smoke-tests
  annotations:
    argocd.argoproj.io/hook: PostSync
    argocd.argoproj.io/hook-delete-policy: HookSucceeded
spec:
  template:
    spec:
      containers:
        - name: test
          image: curlimages/curl
          command: ['sh', '-c', 'curl -sf http://api.production.svc/health']
      restartPolicy: Never

---
# Hook SyncFail - Notification d'échec
apiVersion: batch/v1
kind: Job
metadata:
  name: notify-failure
  annotations:
    argocd.argoproj.io/hook: SyncFail
    argocd.argoproj.io/hook-delete-policy: HookSucceeded
spec:
  template:
    spec:
      containers:
        - name: notify
          image: curlimages/curl
          command: ['curl', '-X', 'POST', 'https://hooks.slack.com/services/xxx',
                    '-d', '{"text":"Sync failed for myapp"}']
      restartPolicy: Never
\`\`\`

## 5. Health Checks personnalisés

\`\`\`yaml
# argocd-cm ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-cm
  namespace: argocd
data:
  resource.customizations.health.certmanager.io_Certificate: |
    hs = {}
    if obj.status ~= nil then
      if obj.status.conditions ~= nil then
        for i, condition in ipairs(obj.status.conditions) do
          if condition.type == "Ready" and condition.status == "True" then
            hs.status = "Healthy"
            hs.message = condition.message
            return hs
          end
        end
      end
    end
    hs.status = "Progressing"
    hs.message = "Waiting for certificate"
    return hs
\`\`\`

## 6. Prune et Finalizers

\`\`\`yaml
# Protéger une ressource contre la suppression
metadata:
  annotations:
    argocd.argoproj.io/sync-options: Prune=false

# Ignorer les différences sur certains champs
spec:
  ignoreDifferences:
    - group: apps
      kind: Deployment
      jsonPointers:
        - /spec/replicas
    - group: "*"
      kind: "*"
      managedFieldsManagers:
        - kube-controller-manager
\`\`\``,
    practiceContent: `# Exercices pratiques - Sync et stratégies

## Exercice 1 : Configurer l'auto-sync avec prune

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: demo-app
spec:
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
\`\`\`

Testez en supprimant une ressource du repo et vérifiez qu'elle est pruned.

## Exercice 2 : Implémenter des sync waves

Créez un déploiement ordonné :
1. Wave -1 : Namespace + RBAC
2. Wave 0 : ConfigMaps + Secrets
3. Wave 1 : Database StatefulSet
4. Wave 2 : API Deployment
5. Wave 3 : Frontend + Ingress

## Exercice 3 : Hooks de migration

\`\`\`yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: "{{ .Release.Name }}-migrate"
  annotations:
    argocd.argoproj.io/hook: PreSync
    argocd.argoproj.io/hook-delete-policy: BeforeHookCreation
spec:
  template:
    spec:
      containers:
        - name: migrate
          image: myapp:latest
          command: ["alembic", "upgrade", "head"]
      restartPolicy: Never
\`\`\`

## Exercice 4 : Health check custom

Ajoutez un health check pour un CRD personnalisé en éditant argocd-cm.`,
    keyPoints: JSON.stringify(['La sync policy automated avec prune et selfHeal maintient le cluster aligné avec Git', 'Les sync waves ordonnent la création des ressources par numéro croissant', 'Les hooks PreSync, Sync, PostSync et SyncFail orchestrent les actions autour du déploiement', 'hook-delete-policy contrôle le cycle de vie des ressources de hook après exécution', 'Les retry avec backoff exponentiel gèrent les erreurs transitoires automatiquement', 'PruneLast supprime les anciennes ressources seulement après la création des nouvelles', 'Les health checks Lua personnalisés étendent la détection de santé aux CRDs', 'ignoreDifferences évite les sync loops sur les champs modifiés par les controllers']),
  },


  // ============================================================
  // ARGOCD - Module 4: Multi-cluster et ApplicationSets
  // ============================================================
  {
    id: 'argo-04',
    courseId: 'argocd',
    title: 'Multi-cluster et ApplicationSets',
    duration: '3h',
    orderIndex: 4,
    theoryContent: `# Multi-cluster et ApplicationSets ArgoCD

## 1. Introduction

Dans les organisations complexes, les applications sont souvent déployées sur **plusieurs clusters Kubernetes** (dev, staging, production, multi-région). Les **ApplicationSets** permettent de générer automatiquement des Applications ArgoCD à partir de templates et de générateurs, simplifiant la gestion à grande échelle.

Les ApplicationSets résolvent :
- Le déploiement multi-cluster sans duplication
- La gestion de monorepos avec de nombreux services
- Le self-service pour les équipes de développement
- La standardisation des déploiements

## 2. Gestion multi-cluster

### Ajouter des clusters

\`\`\`bash
# Lister les clusters configurés
argocd cluster list

# Ajouter un cluster via kubeconfig
argocd cluster add production-cluster --name production \\
  --kubeconfig ~/.kube/production.yaml

# Ajouter avec des labels
argocd cluster add staging-eu --name staging-eu \\
  --label env=staging \\
  --label region=eu-west-1

# Via Secret Kubernetes
apiVersion: v1
kind: Secret
metadata:
  name: production-cluster
  namespace: argocd
  labels:
    argocd.argoproj.io/secret-type: cluster
    env: production
    region: eu-west-1
type: Opaque
stringData:
  name: production-eu
  server: https://k8s-prod-eu.company.com
  config: |
    {
      "bearerToken": "<token>",
      "tlsClientConfig": {
        "insecure": false,
        "caData": "<base64-ca>"
      }
    }
\`\`\`

## 3. ApplicationSet - Générateurs

### Cluster Generator

Déploie sur tous les clusters correspondant aux labels :

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: monitoring-stack
  namespace: argocd
spec:
  generators:
    - clusters:
        selector:
          matchLabels:
            env: production
        values:
          prometheus_retention: "30d"
  template:
    metadata:
      name: 'monitoring-{{name}}'
    spec:
      project: infrastructure
      source:
        repoURL: https://github.com/company/infra.git
        path: monitoring/overlays/{{metadata.labels.region}}
        targetRevision: main
      destination:
        server: '{{server}}'
        namespace: monitoring
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
\`\`\`

### Git Directory Generator

Génère une application par répertoire dans le dépôt :

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: microservices
spec:
  generators:
    - git:
        repoURL: https://github.com/company/k8s-manifests.git
        revision: main
        directories:
          - path: apps/*
          - path: apps/legacy-*
            exclude: true
  template:
    metadata:
      name: '{{path.basename}}'
    spec:
      project: applications
      source:
        repoURL: https://github.com/company/k8s-manifests.git
        path: '{{path}}'
        targetRevision: main
      destination:
        server: https://kubernetes.default.svc
        namespace: '{{path.basename}}'
\`\`\`

### Git File Generator

Génère des applications à partir d'un fichier de configuration :

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: team-apps
spec:
  generators:
    - git:
        repoURL: https://github.com/company/app-config.git
        revision: main
        files:
          - path: "teams/*/config.json"
  template:
    metadata:
      name: '{{team}}-{{app}}'
      labels:
        team: '{{team}}'
    spec:
      source:
        repoURL: '{{repoURL}}'
        path: '{{path}}'
        targetRevision: '{{branch}}'
        helm:
          valueFiles:
            - 'values-{{env}}.yaml'
      destination:
        server: '{{cluster}}'
        namespace: '{{namespace}}'
\`\`\`

### Matrix et Merge Generators

\`\`\`yaml
# Matrix - produit cartésien de deux générateurs
spec:
  generators:
    - matrix:
        generators:
          - clusters:
              selector:
                matchLabels:
                  env: production
          - git:
              repoURL: https://github.com/company/apps.git
              revision: main
              directories:
                - path: apps/*
  template:
    metadata:
      name: '{{path.basename}}-{{name}}'
    spec:
      destination:
        server: '{{server}}'
        namespace: '{{path.basename}}'
\`\`\`

## 4. Stratégies de rollout progressif

\`\`\`yaml
# Avec Argo Rollouts
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: myapp
spec:
  replicas: 10
  strategy:
    canary:
      steps:
        - setWeight: 10
        - pause: {duration: 5m}
        - setWeight: 30
        - pause: {duration: 5m}
        - setWeight: 60
        - pause: {duration: 5m}
      canaryService: myapp-canary
      stableService: myapp-stable
      trafficRouting:
        istio:
          virtualService:
            name: myapp-vsvc
\`\`\`

## 5. Progressive Sync

\`\`\`yaml
# Déployer progressivement sur les clusters
spec:
  strategy:
    type: RollingSync
    rollingSync:
      steps:
        - matchExpressions:
            - key: env
              operator: In
              values: [staging]
        - matchExpressions:
            - key: region
              operator: In
              values: [eu-west-1]
          maxUpdate: 1
        - matchExpressions:
            - key: env
              operator: In
              values: [production]
          maxUpdate: "25%"
\`\`\``,
    practiceContent: `# Exercices pratiques - Multi-cluster et ApplicationSets

## Exercice 1 : Cluster Generator

Créez un ApplicationSet qui déploie le monitoring sur tous les clusters :

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: monitoring
spec:
  generators:
    - clusters:
        selector:
          matchLabels:
            monitoring: "true"
  template:
    metadata:
      name: 'monitoring-{{name}}'
    spec:
      source:
        repoURL: https://github.com/company/monitoring.git
        path: base
      destination:
        server: '{{server}}'
        namespace: monitoring
\`\`\`

## Exercice 2 : Git Directory Generator pour un monorepo

\`\`\`yaml
spec:
  generators:
    - git:
        repoURL: https://github.com/company/services.git
        directories:
          - path: "services/*"
  template:
    metadata:
      name: '{{path.basename}}'
    spec:
      source:
        path: '{{path}}/deploy'
      destination:
        namespace: '{{path.basename}}'
\`\`\`

## Exercice 3 : Matrix Generator multi-env

Combinez clusters et services pour un déploiement croisé :

\`\`\`yaml
generators:
  - matrix:
      generators:
        - clusters:
            selector:
              matchLabels:
                env: production
        - list:
            elements:
              - app: api
                port: "8080"
              - app: worker
                port: "9090"
\`\`\`

## Exercice 4 : Rollout progressif

Configurez un déploiement canary avec Argo Rollouts et surveillez les métriques.`,
    keyPoints: JSON.stringify(['Les ApplicationSets génèrent automatiquement des Applications à partir de templates', 'Le Cluster Generator déploie sur tous les clusters correspondant à un sélecteur de labels', 'Le Git Directory Generator crée une application par répertoire dans un monorepo', 'Le Matrix Generator produit le produit cartésien de deux générateurs pour des combinaisons', 'Le Git File Generator permet aux équipes de s\'auto-servir via des fichiers de configuration', 'Les clusters sont enregistrés via argocd cluster add ou des Secrets Kubernetes', 'La progressive sync déploie graduellement sur les clusters par étapes contrôlées', 'Le Merge Generator combine les résultats de plusieurs générateurs avec priorité']),
  },


  // ============================================================
  // ARGOCD - Module 5: Administration ArgoCD
  // ============================================================
  {
    id: 'argo-05',
    courseId: 'argocd',
    title: 'Administration ArgoCD',
    duration: '3h',
    orderIndex: 5,
    theoryContent: `# Administration ArgoCD

## 1. Introduction

L'administration d'ArgoCD en production couvre la sécurité (RBAC, SSO), les notifications, la sauvegarde et la reprise après sinistre. Une installation ArgoCD bien administrée offre un contrôle d'accès granulaire, informe proactivement les équipes et résiste aux pannes.

## 2. RBAC (Role-Based Access Control)

ArgoCD implémente un système RBAC basé sur Casbin :

\`\`\`yaml
# argocd-rbac-cm ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-rbac-cm
  namespace: argocd
data:
  policy.default: role:readonly
  policy.csv: |
    # Rôles personnalisés
    p, role:dev-team, applications, get, default/*, allow
    p, role:dev-team, applications, sync, default/*, allow
    p, role:dev-team, applications, create, default/*, allow
    p, role:dev-team, logs, get, default/*, allow

    p, role:ops-team, applications, *, */*, allow
    p, role:ops-team, clusters, get, *, allow
    p, role:ops-team, repositories, *, *, allow
    p, role:ops-team, projects, *, *, allow

    p, role:viewer, applications, get, */*, allow
    p, role:viewer, logs, get, */*, allow

    # Attribution aux groupes SSO
    g, dev-frontend, role:dev-team
    g, dev-backend, role:dev-team
    g, platform-team, role:ops-team
    g, management, role:viewer

  scopes: '[groups, email]'
\`\`\`

### AppProject pour l'isolation

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: team-frontend
  namespace: argocd
spec:
  description: "Projet pour l'équipe Frontend"
  sourceRepos:
    - 'https://github.com/company/frontend-*'
  destinations:
    - namespace: 'frontend-*'
      server: https://kubernetes.default.svc
    - namespace: 'frontend-*'
      server: https://staging.company.com
  clusterResourceWhitelist:
    - group: ''
      kind: Namespace
  namespaceResourceBlacklist:
    - group: ''
      kind: ResourceQuota
    - group: ''
      kind: LimitRange
  roles:
    - name: developer
      description: "Frontend developers"
      policies:
        - p, proj:team-frontend:developer, applications, *, team-frontend/*, allow
      groups:
        - frontend-devs
\`\`\`

## 3. SSO (Single Sign-On)

### Configuration OIDC

\`\`\`yaml
# argocd-cm ConfigMap
data:
  url: https://argocd.company.com
  oidc.config: |
    name: Keycloak
    issuer: https://keycloak.company.com/realms/company
    clientID: argocd
    clientSecret: \\\$oidc.keycloak.clientSecret
    requestedScopes:
      - openid
      - profile
      - email
      - groups
    requestedIDTokenClaims:
      groups:
        essential: true

# argocd-secret pour le client secret
apiVersion: v1
kind: Secret
metadata:
  name: argocd-secret
  namespace: argocd
stringData:
  oidc.keycloak.clientSecret: "my-secret-value"
\`\`\`

### Dex connector (alternative)

\`\`\`yaml
data:
  dex.config: |
    connectors:
      - type: github
        id: github
        name: GitHub
        config:
          clientID: \\\$dex.github.clientID
          clientSecret: \\\$dex.github.clientSecret
          orgs:
            - name: my-company
      - type: ldap
        id: ldap
        name: Corporate LDAP
        config:
          host: ldap.company.com:636
          rootCAData: '<base64-ca>'
          bindDN: cn=argocd,ou=services,dc=company,dc=com
          bindPW: \\\$dex.ldap.bindPW
          userSearch:
            baseDN: ou=users,dc=company,dc=com
            filter: "(objectClass=person)"
            username: uid
          groupSearch:
            baseDN: ou=groups,dc=company,dc=com
            filter: "(objectClass=groupOfNames)"
\`\`\`

## 4. Notifications

\`\`\`yaml
# argocd-notifications-cm
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
  namespace: argocd
data:
  service.slack: |
    token: \\\$slack-token
  service.webhook.grafana: |
    url: https://grafana.company.com/api/annotations
    headers:
      - name: Authorization
        value: "Bearer \\\$grafana-token"

  template.app-deployed: |
    message: |
      Application {{.app.metadata.name}} is now {{.app.status.sync.status}}.
      Revision: {{.app.status.sync.revision}}
    slack:
      attachments: |
        [{
          "color": "{{if eq .app.status.sync.status \"Synced\"}}good{{else}}danger{{end}}",
          "title": "{{.app.metadata.name}}",
          "fields": [
            {"title": "Status", "value": "{{.app.status.sync.status}}", "short": true},
            {"title": "Revision", "value": "{{.app.status.sync.revision | trunc 7}}", "short": true}
          ]
        }]

  trigger.on-deployed: |
    - description: Application deployed
      send: [app-deployed]
      when: app.status.operationState.phase in ['Succeeded']

  trigger.on-health-degraded: |
    - description: App health degraded
      send: [app-deployed]
      when: app.status.health.status == 'Degraded'

  subscriptions: |
    - recipients: [slack:engineering]
      triggers: [on-deployed, on-health-degraded]
\`\`\`

## 5. Disaster Recovery

\`\`\`bash
# Backup - Exporter toute la configuration
argocd admin export > argocd-backup.yaml

# Backup des secrets et configmaps
kubectl get secret -n argocd -o yaml > secrets-backup.yaml
kubectl get configmap -n argocd -o yaml > configmaps-backup.yaml

# Backup des Applications et AppProjects
kubectl get applications -n argocd -o yaml > apps-backup.yaml
kubectl get appprojects -n argocd -o yaml > projects-backup.yaml

# Restore
argocd admin import - < argocd-backup.yaml

# Script de backup automatisé
#!/bin/bash
BACKUP_DIR="/backups/argocd/\\\$(date +%Y%m%d)"
mkdir -p \\\$BACKUP_DIR
argocd admin export > \\\$BACKUP_DIR/export.yaml
kubectl get all -n argocd -o yaml > \\\$BACKUP_DIR/resources.yaml
\`\`\``,
    practiceContent: `# Exercices pratiques - Administration ArgoCD

## Exercice 1 : Configurer RBAC multi-équipes

\`\`\`yaml
# Créez une politique RBAC
policy.csv: |
  p, role:frontend, applications, sync, frontend-project/*, allow
  p, role:frontend, applications, get, frontend-project/*, allow
  p, role:backend, applications, *, backend-project/*, allow
  g, frontend-team, role:frontend
  g, backend-team, role:backend
\`\`\`

Testez les accès avec différents utilisateurs.

## Exercice 2 : AppProject avec restrictions

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: team-api
spec:
  sourceRepos:
    - 'https://github.com/company/api-*'
  destinations:
    - namespace: 'api-*'
      server: https://kubernetes.default.svc
  clusterResourceWhitelist: []
  namespaceResourceWhitelist:
    - group: 'apps'
      kind: Deployment
    - group: ''
      kind: Service
\`\`\`

## Exercice 3 : Notifications Slack

Configurez les notifications pour les déploiements et les dégradations de santé.

## Exercice 4 : Plan de disaster recovery

\`\`\`bash
# Créer un CronJob de backup
kubectl create cronjob argocd-backup \\
  --image=argoproj/argocd \\
  --schedule="0 2 * * *" \\
  -- sh -c "argocd admin export > /backup/argocd-\\\$(date +%Y%m%d).yaml"
\`\`\``,
    keyPoints: JSON.stringify(['Le RBAC ArgoCD utilise des politiques Casbin avec format p (permission) et g (groupe)', 'Les AppProjects isolent les équipes en limitant les sources, destinations et types de ressources', 'SSO via OIDC ou Dex permet l\'authentification avec Keycloak, GitHub, LDAP', 'Les notifications informent les équipes via Slack, email ou webhooks sur les événements', 'Les triggers définissent les conditions qui déclenchent l\'envoi de notifications', 'argocd admin export/import permet la sauvegarde et restauration complète', 'Les secrets sont référencés par préfixe dollar dans les ConfigMaps d\'ArgoCD', 'La haute disponibilité nécessite plusieurs réplicas des composants server et repo-server']),
  },


  // ============================================================
  // ARTIFACTORY - Module 4: Sécurité et Xray
  // ============================================================
  {
    id: 'art-04',
    courseId: 'artifactory',
    title: 'Sécurité et Xray',
    duration: '3h',
    orderIndex: 4,
    theoryContent: `# Sécurité et JFrog Xray

## 1. Introduction

**JFrog Xray** est l'outil de sécurité intégré à la plateforme JFrog. Il effectue une analyse récursive et approfondie de tous les artefacts stockés dans Artifactory pour détecter les vulnérabilités, les violations de licences et générer des SBOM (Software Bill of Materials).

Xray offre :
- Scan récursif de toutes les dépendances transitives
- Base de données de vulnérabilités constamment mise à jour
- Politiques de sécurité automatisées
- Blocage des artefacts non conformes
- Génération de SBOM au format standard

## 2. Architecture Xray

\`\`\`
┌─────────────────────────────────────────────────┐
│                 JFrog Platform                    │
├──────────────┬──────────────────────────────────┤
│ Artifactory  │           Xray                    │
│ (stockage)   │  ┌──────────────────────────┐    │
│              │  │ Indexing Service          │    │
│   Repos ─────>  │ (analyse des artefacts)  │    │
│              │  └──────────┬───────────────┘    │
│              │             │                     │
│              │  ┌──────────▼───────────────┐    │
│              │  │ VulnDB (base de données) │    │
│              │  │ NVD, VulnDB, advisories  │    │
│              │  └──────────┬───────────────┘    │
│              │             │                     │
│              │  ┌──────────▼───────────────┐    │
│              │  │ Policy Engine            │    │
│              │  │ (évaluation des règles)  │    │
│              │  └──────────────────────────┘    │
└──────────────┴──────────────────────────────────┘
\`\`\`

## 3. Politiques de sécurité

Les politiques définissent les règles à appliquer lors de l'analyse :

\`\`\`bash
# Créer une politique via l'API REST
curl -X POST "https://artifactory.company.com/xray/api/v2/policies" \\
  -H "Authorization: Bearer \\\$TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "critical-vulnerabilities",
    "type": "security",
    "description": "Block critical and high vulnerabilities",
    "rules": [
      {
        "name": "block-critical",
        "priority": 1,
        "criteria": {
          "min_severity": "Critical"
        },
        "actions": {
          "block_download": {
            "active": true,
            "unscanned": true
          },
          "block_release_bundle_distribution": true,
          "fail_build": true,
          "notify_watch_recipients": true,
          "notify_deployer": true,
          "create_ticket_enabled": true
        }
      },
      {
        "name": "warn-high",
        "priority": 2,
        "criteria": {
          "min_severity": "High",
          "cvss_range": {
            "from": 7.0,
            "to": 8.9
          }
        },
        "actions": {
          "block_download": {
            "active": false
          },
          "notify_watch_recipients": true,
          "webhooks": ["slack-security"]
        }
      }
    ]
  }'
\`\`\`

## 4. Watches

Les watches associent des politiques à des ressources surveillées :

\`\`\`bash
curl -X POST "https://artifactory.company.com/xray/api/v2/watches" \\
  -H "Authorization: Bearer \\\$TOKEN" \\
  -d '{
    "general_data": {
      "name": "production-docker-watch",
      "description": "Surveille les images Docker de production",
      "active": true
    },
    "project_resources": {
      "resources": [
        {
          "type": "repository",
          "name": "docker-prod-local",
          "bin_mgr_id": "default",
          "filters": [
            {"type": "regex", "value": ".*:latest"},
            {"type": "regex", "value": ".*:v[0-9]+.*"}
          ]
        }
      ]
    },
    "assigned_policies": [
      {"name": "critical-vulnerabilities", "type": "security"},
      {"name": "license-compliance", "type": "license"}
    ]
  }'
\`\`\`

## 5. Violations et rapports

\`\`\`bash
# Lister les violations
curl "https://artifactory.company.com/xray/api/v1/violations?watch_name=production-docker-watch&order_by=severity&direction=desc&page_num=1&num_of_rows=50"

# Exporter un rapport de vulnérabilités
curl -X POST "https://artifactory.company.com/xray/api/v1/reports/vulnerabilities" \\
  -d '{
    "name": "weekly-vuln-report",
    "type": "vulnerabilities",
    "resources": {
      "repositories": [
        {"name": "docker-prod-local"}
      ]
    },
    "filters": {
      "severities": ["Critical", "High"],
      "has_remediation": true
    }
  }'

# Ignorer un CVE spécifique (avec justification)
curl -X POST "https://artifactory.company.com/xray/api/v1/ignore_rules" \\
  -d '{
    "notes": "False positive - not exploitable in our context",
    "vulnerabilities": [{"id": "CVE-2023-12345"}],
    "expiry_date": "2024-06-30"
  }'
\`\`\`

## 6. SBOM (Software Bill of Materials)

\`\`\`bash
# Générer un SBOM au format CycloneDX
curl "https://artifactory.company.com/xray/api/v1/component/exportDetails" \\
  -d '{
    "component_name": "docker://myapp:1.0.0",
    "package_type": "docker",
    "output_format": "cyclonedx",
    "include_vulnerabilities": true
  }' -o sbom-myapp.json

# SBOM au format SPDX
curl "https://artifactory.company.com/xray/api/v1/component/exportDetails" \\
  -d '{
    "component_name": "npm://mylib:2.3.0",
    "output_format": "spdx"
  }'
\`\`\``,
    practiceContent: `# Exercices pratiques - Sécurité et Xray

## Exercice 1 : Créer une politique de sécurité

Configurez une politique qui :
- Bloque les vulnérabilités Critical (CVSS >= 9.0)
- Alerte sur les High (CVSS 7.0-8.9)
- Notifie les développeurs par email

## Exercice 2 : Configurer un Watch

\`\`\`bash
# Créer un watch sur votre dépôt Docker
curl -X POST "https://your-artifactory/xray/api/v2/watches" \\
  -d '{
    "general_data": {"name": "my-watch", "active": true},
    "project_resources": {
      "resources": [{"type": "repository", "name": "docker-local"}]
    },
    "assigned_policies": [{"name": "security-policy", "type": "security"}]
  }'
\`\`\`

## Exercice 3 : Analyser les violations

\`\`\`bash
# Scanner un artefact spécifique
curl "https://your-artifactory/xray/api/v1/summary/artifact" \\
  -d '{"paths": ["docker-local/myapp/1.0.0/manifest.json"]}'

# Lister les composants vulnérables
curl "https://your-artifactory/xray/api/v1/violations?severity=Critical"
\`\`\`

## Exercice 4 : Générer un SBOM

Exportez le SBOM de votre application au format CycloneDX et analysez les résultats :

\`\`\`bash
# Export et analyse
curl "https://your-artifactory/xray/api/v1/component/exportDetails" \\
  -d '{"component_name":"docker://myapp:latest","output_format":"cyclonedx"}' \\
  | jq '.components | length'
\`\`\``,
    keyPoints: JSON.stringify(['Xray effectue une analyse récursive de toutes les dépendances transitives des artefacts', 'Les politiques de sécurité définissent les actions à appliquer selon la sévérité des vulnérabilités', 'Les watches associent des politiques à des ressources spécifiques (repos, builds, bundles)', 'Le blocage de téléchargement empêche l\'utilisation d\'artefacts non conformes', 'Les SBOM (CycloneDX, SPDX) documentent tous les composants d\'un artefact', 'Les ignore rules permettent de gérer les faux positifs avec justification et expiration', 'L\'intégration CI/CD avec fail_build bloque les pipelines en cas de violation', 'La base VulnDB est constamment mise à jour avec les CVE des sources NVD et advisories']),
  },

  // ============================================================
  // ARTIFACTORY - Module 5: Haute disponibilité et performance
  // ============================================================
  {
    id: 'art-05',
    courseId: 'artifactory',
    title: 'Haute disponibilité et performance',
    duration: '3h',
    orderIndex: 5,
    theoryContent: `# Haute Disponibilité et Performance Artifactory

## 1. Introduction

En environnement d'entreprise, Artifactory doit être déployé en haute disponibilité (HA) pour garantir la continuité de service. Les pipelines CI/CD, les développeurs et les déploiements en production dépendent tous d'Artifactory. Une panne peut bloquer toute la chaîne de livraison.

Ce module couvre le clustering, la réplication, l'optimisation des performances et le monitoring.

## 2. Architecture HA

\`\`\`
                    ┌──────────────────┐
                    │   Load Balancer  │
                    │   (HAProxy/NLB)  │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
    ┌─────────▼───┐  ┌──────▼──────┐  ┌───▼─────────┐
    │ Artifactory │  │ Artifactory │  │ Artifactory │
    │   Node 1    │  │   Node 2    │  │   Node 3    │
    │  (Primary)  │  │  (Member)   │  │  (Member)   │
    └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
           │                │                │
    ┌──────▼────────────────▼────────────────▼──────┐
    │              Shared Storage                     │
    │         (NFS / S3 / Azure Blob)               │
    └───────────────────────┬───────────────────────┘
                            │
    ┌───────────────────────▼───────────────────────┐
    │           External Database                     │
    │      (PostgreSQL / MySQL / Oracle)             │
    └───────────────────────────────────────────────┘
\`\`\`

## 3. Configuration du Cluster

\`\`\`yaml
# system.yaml (chaque noeud)
shared:
  database:
    type: postgresql
    driver: org.postgresql.Driver
    url: "jdbc:postgresql://pg-cluster:5432/artifactory"
    username: artifactory
    password: encrypted-password

  node:
    id: "node-1"
    primary: true
    haEnabled: true

  security:
    joinKey: "your-cluster-join-key"

  extraJavaOpts: "-Xms4g -Xmx8g -XX:+UseG1GC"

artifactory:
  clustering:
    enabled: true
    checkerIntervalSecs: 10

  binarystore:
    type: s3-storage-v3
    s3:
      endpoint: s3.amazonaws.com
      region: eu-west-1
      bucketName: artifactory-binaries
      credential:
        accessKey: AKIAXXXXXXXX
        secretKey: encrypted-secret
      multiPartLimit: 100000000
      multipartElementSize: 50000000
\`\`\`

## 4. Réplication

### Push Replication (active)

\`\`\`bash
# Configurer la réplication push
curl -X PUT "https://primary.company.com/artifactory/api/replications/docker-prod-local" \\
  -H "Authorization: Bearer \\\$TOKEN" \\
  -d '{
    "url": "https://dr-site.company.com/artifactory/docker-prod-local",
    "username": "replication-user",
    "password": "encrypted",
    "enabled": true,
    "cronExp": "0 0/5 * * * ?",
    "syncDeletes": true,
    "syncProperties": true,
    "enableEventReplication": true
  }'
\`\`\`

### Pull Replication

\`\`\`bash
curl -X PUT "https://dr-site.company.com/artifactory/api/replications/pull/docker-prod-local" \\
  -d '{
    "url": "https://primary.company.com/artifactory/docker-prod-local",
    "enabled": true,
    "cronExp": "0 0/10 * * * ?",
    "syncDeletes": true
  }'
\`\`\`

## 5. CDN et optimisation

\`\`\`yaml
# Configuration CDN (CloudFront)
artifactory:
  cdn:
    enabled: true
    provider: cloudfront
    cloudfront:
      domainName: artifacts-cdn.company.com
      region: eu-west-1
      keyPairId: KXXXXXXXX
      privateKey: /opt/jfrog/artifactory/etc/cdn-key.pem
      ttl: 3600
\`\`\`

### Optimisations de performance

\`\`\`yaml
# Tuning JVM
shared:
  extraJavaOpts: |
    -Xms8g -Xmx12g
    -XX:+UseG1GC
    -XX:MaxGCPauseMillis=200
    -XX:+ParallelRefProcEnabled

# Connection pool
artifactory:
  database:
    pool:
      maxActive: 200
      maxIdle: 50
      minIdle: 10

# Cache configuration
  cache:
    maxSize: 5000
    idleTimeSecs: 120
\`\`\`

## 6. Monitoring

\`\`\`bash
# Health check
curl https://artifactory.company.com/artifactory/api/system/ping
# Response: OK

# Vérifier le statut du cluster
curl https://artifactory.company.com/artifactory/api/system/cluster

# Métriques Prometheus (nécessite le plugin)
curl https://artifactory.company.com/artifactory/api/v1/system/metrics

# Métriques clés à surveiller
# - jfrt_runtime_heap_used_bytes
# - jfrt_db_connections_active_total
# - jfrt_artifacts_gc_duration_seconds
# - jfrt_http_connections_active
# - jfrt_storage_total_size_bytes
\`\`\`

\`\`\`yaml
# Prometheus scrape config
scrape_configs:
  - job_name: 'artifactory'
    metrics_path: '/artifactory/api/v1/system/metrics'
    bearer_token: '<token>'
    static_configs:
      - targets: ['artifactory:8082']
\`\`\``,
    practiceContent: `# Exercices pratiques - HA et Performance

## Exercice 1 : Configurer un cluster à 2 noeuds

\`\`\`yaml
# Node 1 - system.yaml
shared:
  database:
    url: "jdbc:postgresql://db:5432/artifactory"
  node:
    id: "node-1"
    primary: true
    haEnabled: true
\`\`\`

Vérifiez avec : \`curl /api/system/cluster\`

## Exercice 2 : Configurer la réplication

Mettez en place une réplication push entre deux instances :

\`\`\`bash
curl -X PUT "https://primary/api/replications/libs-release-local" \\
  -d '{"url":"https://secondary/artifactory/libs-release-local",
       "enabled":true,"cronExp":"0 0/5 * * * ?"}'
\`\`\`

## Exercice 3 : Monitoring avec Prometheus

Configurez le scraping des métriques Artifactory et créez un dashboard Grafana.

## Exercice 4 : Garbage Collection et maintenance

\`\`\`bash
# Lancer le GC manuellement
curl -X POST "https://artifactory/api/system/storage/gc"

# Vérifier l'espace de stockage
curl "https://artifactory/api/storageinfo"
\`\`\``,
    keyPoints: JSON.stringify(['Le cluster HA Artifactory nécessite un stockage partagé (S3/NFS) et une base de données externe', 'Chaque noeud du cluster partage le même join key et la même base de données', 'La réplication push synchronise les artefacts vers un site de disaster recovery', 'La réplication event-based offre un RPO proche de zéro pour les données critiques', 'Le CDN (CloudFront, Akamai) accélère la distribution des artefacts à l\'international', 'Le tuning JVM avec G1GC et des pools de connexions optimisés améliore les performances', 'Le monitoring via Prometheus/Grafana surveille les métriques de santé et de performance', 'Le Garbage Collection libère l\'espace des binaires orphelins non référencés']),
  },


  // ============================================================
  // SONARQUBE - Module 4: Profils de qualité personnalisés
  // ============================================================
  {
    id: 'sq-04',
    courseId: 'sonarqube',
    title: 'Profils de qualité personnalisés',
    duration: '3h',
    orderIndex: 4,
    theoryContent: `# Profils de Qualité Personnalisés SonarQube

## 1. Introduction

Les **Quality Profiles** (profils de qualité) définissent l'ensemble des règles appliquées lors de l'analyse du code. SonarQube fournit des profils par défaut ("Sonar way"), mais les organisations ont souvent besoin de profils personnalisés adaptés à leurs standards de codage, leur contexte métier et leurs exigences de sécurité.

La personnalisation des profils permet de :
- Adapter les règles au contexte du projet (embarqué, web, finance)
- Appliquer des standards spécifiques (MISRA, CERT, OWASP)
- Gérer la dette technique progressivement
- Standardiser les pratiques entre les équipes

## 2. Gestion des profils

### Créer et configurer un profil

\`\`\`bash
# Créer un profil via l'API
curl -X POST "https://sonarqube.company.com/api/qualityprofiles/create" \\
  -u admin:password \\
  -d "name=Company Java Standard&language=java"

# Copier un profil existant comme base
curl -X POST "https://sonarqube.company.com/api/qualityprofiles/copy" \\
  -d "fromKey=AYxx-profile-key&toName=Company Java Custom"

# Activer une règle dans le profil
curl -X POST "https://sonarqube.company.com/api/qualityprofiles/activate_rule" \\
  -d "key=AYxx-profile-key&rule=java:S1135&severity=MAJOR&params=message=TODO should have a ticket reference"

# Désactiver une règle
curl -X POST "https://sonarqube.company.com/api/qualityprofiles/deactivate_rule" \\
  -d "key=AYxx-profile-key&rule=java:S106"

# Activer un groupe de règles par tag
curl -X POST "https://sonarqube.company.com/api/qualityprofiles/activate_rules" \\
  -d "targetKey=AYxx-profile-key&tags=owasp-top10&activation=false"
\`\`\`

## 3. Héritage de profils

L'héritage permet de créer une hiérarchie de profils :

\`\`\`
┌──────────────────────────┐
│   Company Base Profile   │  ← Règles communes à tous
│   (300 règles)           │
├──────────────────────────┤
│         │                │
│  ┌──────▼──────┐  ┌─────▼──────┐
│  │ Web Profile │  │ Embedded   │
│  │ (+50 règles)│  │ (+80 MISRA)│
│  │ (-10 règles)│  │ (-20 rules)│
│  └──────┬──────┘  └────────────┘
│         │
│  ┌──────▼──────┐
│  │ Microservice│
│  │ Profile     │
│  │ (+20 cloud) │
│  └─────────────┘
└──────────────────────────┘
\`\`\`

\`\`\`bash
# Définir l'héritage
curl -X POST "https://sonarqube.company.com/api/qualityprofiles/change_parent" \\
  -d "qualityProfile=Web Profile&parentQualityProfile=Company Base&language=java"
\`\`\`

## 4. Comparaison de profils

\`\`\`bash
# Comparer deux profils
curl "https://sonarqube.company.com/api/qualityprofiles/compare" \\
  -d "leftKey=profile-key-1&rightKey=profile-key-2"

# Résultat : règles ajoutées, supprimées, modifiées
# Utile pour auditer les changements entre versions

# Exporter un profil (backup)
curl "https://sonarqube.company.com/api/qualityprofiles/backup" \\
  -d "qualityProfile=Company Java Standard&language=java" > profile-backup.xml

# Importer un profil
curl -X POST "https://sonarqube.company.com/api/qualityprofiles/restore" \\
  -F "backup=@profile-backup.xml"
\`\`\`

## 5. Règles personnalisées

### Créer des règles custom basées sur des templates

\`\`\`bash
# Lister les templates de règles disponibles
curl "https://sonarqube.company.com/api/rules/search?is_template=true&languages=java"

# Créer une règle custom depuis un template
curl -X POST "https://sonarqube.company.com/api/rules/create" \\
  -d "custom_key=company_naming_convention" \\
  -d "template_key=java:S120" \\
  -d "name=Company class naming convention" \\
  -d "severity=MAJOR" \\
  -d "params=format=^[A-Z][a-zA-Z0-9]*\\\$" \\
  -d "markdown_description=Les classes doivent suivre la convention PascalCase de l'entreprise."

# Règle XPath custom pour XML
curl -X POST "https://sonarqube.company.com/api/rules/create" \\
  -d "custom_key=pom_no_snapshot" \\
  -d "template_key=xml:XPathCheck" \\
  -d "name=No SNAPSHOT in production POM" \\
  -d "params=expression=//version[contains(text(),'SNAPSHOT')]" \\
  -d "severity=BLOCKER"
\`\`\`

## 6. Gestion du changelog et audit

\`\`\`bash
# Historique des changements d'un profil
curl "https://sonarqube.company.com/api/qualityprofiles/changelog" \\
  -d "qualityProfile=Company Java Standard&language=java&ps=50"

# Projets associés à un profil
curl "https://sonarqube.company.com/api/qualityprofiles/projects" \\
  -d "key=profile-key"

# Assigner un profil à un projet
curl -X POST "https://sonarqube.company.com/api/qualityprofiles/add_project" \\
  -d "qualityProfile=Company Java Standard&project=my-project&language=java"
\`\`\`

## 7. Bonnes pratiques

- Partir de "Sonar way" et personnaliser progressivement
- Utiliser l'héritage pour les règles communes
- Documenter chaque désactivation de règle avec une justification
- Versionner les exports de profils dans Git
- Réviser les profils trimestriellement
- Activer les nouvelles règles des mises à jour SonarQube progressivement`,
    practiceContent: `# Exercices pratiques - Profils de qualité

## Exercice 1 : Créer une hiérarchie de profils

\`\`\`bash
# Créer le profil de base
curl -X POST "http://localhost:9000/api/qualityprofiles/create" \\
  -u admin:admin -d "name=Base Company&language=java"

# Créer un profil enfant pour le web
curl -X POST "http://localhost:9000/api/qualityprofiles/create" \\
  -d "name=Web Apps&language=java"

# Définir l'héritage
curl -X POST "http://localhost:9000/api/qualityprofiles/change_parent" \\
  -d "qualityProfile=Web Apps&parentQualityProfile=Base Company&language=java"
\`\`\`

## Exercice 2 : Activer les règles OWASP

\`\`\`bash
# Activer toutes les règles OWASP Top 10
curl -X POST "http://localhost:9000/api/qualityprofiles/activate_rules" \\
  -u admin:admin \\
  -d "targetKey=<profile-key>&tags=owasp-top10"
\`\`\`

## Exercice 3 : Créer une règle custom

Créez une règle qui vérifie votre convention de nommage d'entreprise.

## Exercice 4 : Export/Import de profils

\`\`\`bash
# Exporter pour versionner
curl "http://localhost:9000/api/qualityprofiles/backup?qualityProfile=Base Company&language=java" \\
  > profiles/java-base.xml

# Importer sur une autre instance
curl -X POST "http://sonar-prod:9000/api/qualityprofiles/restore" \\
  -F "backup=@profiles/java-base.xml"
\`\`\``,
    keyPoints: JSON.stringify(['Les Quality Profiles définissent l\'ensemble des règles appliquées lors de l\'analyse', 'L\'héritage de profils permet de créer des hiérarchies avec spécialisation progressive', 'Les règles custom sont créées à partir de templates fournis par les plugins de langage', 'La comparaison de profils aide à auditer les différences entre équipes ou versions', 'L\'export/import XML permet de versionner et déployer les profils entre instances', 'Chaque désactivation de règle doit être documentée et justifiée', 'Les tags (owasp, cert, cwe) facilitent l\'activation groupée de règles de sécurité', 'Le changelog du profil trace toutes les modifications pour l\'audit']),
  },

  // ============================================================
  // SONARQUBE - Module 5: Intégration CI/CD et SonarLint
  // ============================================================
  {
    id: 'sq-05',
    courseId: 'sonarqube',
    title: 'Intégration CI/CD et SonarLint',
    duration: '3h',
    orderIndex: 5,
    theoryContent: `# Intégration CI/CD et SonarLint

## 1. Introduction

L'intégration de SonarQube dans le pipeline CI/CD automatise l'analyse de qualité à chaque commit ou pull request. Combinée avec **SonarLint** dans l'IDE, cette approche "shift-left" détecte les problèmes le plus tôt possible dans le cycle de développement.

Le flux optimal :
1. **SonarLint** : détection en temps réel dans l'IDE (avant le commit)
2. **CI/CD** : analyse complète sur le serveur (après le push)
3. **Quality Gate** : validation automatique (avant le merge)

## 2. Intégration Jenkins

\`\`\`groovy
// Jenkinsfile déclaratif
pipeline {
    agent any
    environment {
        SONAR_TOKEN = credentials('sonarqube-token')
    }
    stages {
        stage('Build') {
            steps {
                sh 'mvn clean compile'
            }
        }
        stage('Test') {
            steps {
                sh 'mvn test'
            }
            post {
                always {
                    junit 'target/surefire-reports/*.xml'
                    jacoco(execPattern: 'target/jacoco.exec')
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh """
                        mvn sonar:sonar \\
                          -Dsonar.projectKey=my-project \\
                          -Dsonar.host.url=https://sonarqube.company.com \\
                          -Dsonar.token=\\\${SONAR_TOKEN} \\
                          -Dsonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml \\
                          -Dsonar.pullrequest.key=\\\${env.CHANGE_ID} \\
                          -Dsonar.pullrequest.branch=\\\${env.BRANCH_NAME} \\
                          -Dsonar.pullrequest.base=main
                    """
                }
            }
        }
        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}
\`\`\`

## 3. Intégration GitLab CI

\`\`\`yaml
# .gitlab-ci.yml
variables:
  SONAR_HOST_URL: "https://sonarqube.company.com"
  SONAR_TOKEN: \\\${SONAR_TOKEN}

stages:
  - test
  - quality

test:
  stage: test
  image: maven:3.9-eclipse-temurin-17
  script:
    - mvn test jacoco:report
  artifacts:
    paths:
      - target/site/jacoco/jacoco.xml
      - target/surefire-reports/

sonarqube-analysis:
  stage: quality
  image: sonarsource/sonar-scanner-cli:5
  dependencies:
    - test
  script:
    - |
      sonar-scanner \\
        -Dsonar.projectKey=\\\${CI_PROJECT_PATH_SLUG} \\
        -Dsonar.sources=src/main \\
        -Dsonar.tests=src/test \\
        -Dsonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml \\
        -Dsonar.qualitygate.wait=true
  rules:
    - if: \\\$CI_MERGE_REQUEST_IID
      variables:
        SONAR_EXTRA: "-Dsonar.pullrequest.key=\\\${CI_MERGE_REQUEST_IID} -Dsonar.pullrequest.branch=\\\${CI_MERGE_REQUEST_SOURCE_BRANCH_NAME}"
    - if: \\\$CI_COMMIT_BRANCH == "main"
\`\`\`

## 4. Intégration GitHub Actions

\`\`\`yaml
# .github/workflows/sonar.yml
name: SonarQube Analysis
on:
  push:
    branches: [main]
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  sonarqube:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          java-version: 17
          distribution: temurin

      - name: Build and Test
        run: mvn verify

      - name: SonarQube Scan
        uses: SonarSource/sonarqube-scan-action@master
        env:
          SONAR_TOKEN: \\\${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: \\\${{ secrets.SONAR_HOST_URL }}
        with:
          args: >
            -Dsonar.projectKey=my-project
            -Dsonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml

      - name: SonarQube Quality Gate
        uses: SonarSource/sonarqube-quality-gate-action@master
        timeout-minutes: 5
        env:
          SONAR_TOKEN: \\\${{ secrets.SONAR_TOKEN }}
\`\`\`

## 5. SonarLint - Analyse dans l'IDE

### Connected Mode

SonarLint en mode connecté synchronise les règles et les paramètres depuis le serveur SonarQube :

\`\`\`json
// .vscode/settings.json
{
  "sonarlint.connectedMode.connections.sonarqube": [
    {
      "serverUrl": "https://sonarqube.company.com",
      "token": "squ_xxxxx"
    }
  ],
  "sonarlint.connectedMode.project": {
    "connectionId": "company-sonar",
    "projectKey": "my-project"
  }
}
\`\`\`

\`\`\`xml
<!-- IntelliJ - .idea/sonarlint.xml -->
<component name="SonarLintProjectSettings">
  <option name="bindingEnabled" value="true" />
  <option name="projectKey" value="my-project" />
  <option name="connectionName" value="Company SonarQube" />
</component>
\`\`\`

### Avantages du Connected Mode
- Mêmes règles que le serveur (pas de surprise au CI)
- Résolution des issues marquées comme Won't Fix ou False Positive
- Synchronisation des profils de qualité
- Notifications des nouveaux problèmes

## 6. Décoration des Pull Requests

SonarQube peut décorer les pull requests avec les résultats d'analyse :

\`\`\`bash
# Configuration dans SonarQube (Administration > DevOps Platform)
# GitHub
sonar.pullrequest.github.repository=company/my-project

# GitLab
sonar.pullrequest.gitlab.project.id=12345

# Bitbucket
sonar.pullrequest.bitbucket.repository=my-project
\`\`\``,
    practiceContent: `# Exercices pratiques - Intégration CI/CD

## Exercice 1 : Pipeline Jenkins avec Quality Gate

\`\`\`groovy
pipeline {
    agent { docker { image 'maven:3.9' } }
    stages {
        stage('Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'mvn sonar:sonar'
                }
            }
        }
        stage('Gate') {
            steps {
                waitForQualityGate abortPipeline: true
            }
        }
    }
}
\`\`\`

## Exercice 2 : GitHub Actions complet

Configurez un workflow qui analyse le code et vérifie le Quality Gate sur chaque PR.

## Exercice 3 : SonarLint Connected Mode

1. Installez SonarLint dans VS Code
2. Configurez la connexion au serveur
3. Liez votre projet local au projet SonarQube
4. Vérifiez que les mêmes règles s'appliquent

## Exercice 4 : Décoration de Pull Request

Configurez SonarQube pour commenter automatiquement les PR GitHub avec les résultats d'analyse :

\`\`\`bash
# Vérifiez l'intégration
curl "https://sonarqube.company.com/api/alm_settings/list_definitions"
\`\`\``,
    keyPoints: JSON.stringify(['L\'intégration CI/CD automatise l\'analyse à chaque push ou pull request', 'waitForQualityGate dans Jenkins bloque le pipeline si le Quality Gate échoue', 'L\'analyse de pull request compare uniquement le nouveau code (new code period)', 'SonarLint en Connected Mode synchronise les règles du serveur dans l\'IDE', 'La décoration des PR affiche les résultats directement dans GitHub/GitLab/Bitbucket', 'Le paramètre sonar.qualitygate.wait=true fait échouer le scanner si le gate ne passe pas', 'Les rapports de couverture (JaCoCo, lcov) doivent être générés avant l\'analyse', 'Le fetch-depth:0 est nécessaire pour l\'analyse de blame et le calcul du new code']),
  },


  // ============================================================
  // DOORS - Module 4: Analyse d'impact et baselines
  // ============================================================
  {
    id: 'doors-04',
    courseId: 'doors',
    title: "Analyse d'impact et baselines",
    duration: '3h',
    orderIndex: 4,
    theoryContent: `# Analyse d'Impact et Baselines dans DOORS

## 1. Introduction

L'**analyse d'impact** et les **baselines** sont des fonctionnalités fondamentales de DOORS pour la gestion des exigences dans les projets complexes. L'analyse d'impact permet d'évaluer les conséquences d'une modification d'exigence sur l'ensemble du système, tandis que les baselines capturent un état figé des exigences à un moment donné.

Ces fonctionnalités sont essentielles pour :
- Les projets réglementés (aéronautique DO-178C, automobile ISO 26262)
- La traçabilité entre niveaux d'exigences
- La gestion des changements contrôlés
- Les audits de certification

## 2. Liens et traçabilité

### Types de liens dans DOORS

\`\`\`
Exigences Système (SRS)
    │
    │ satisfiedBy ──────> Exigences Logiciel (SDD)
    │                         │
    │                         │ implementedBy ──> Code Source
    │                         │
    │                         │ verifiedBy ────> Tests
    │
    └─ derivedFrom ─────> Standards (DO-178C)
\`\`\`

### Configurer les types de liens

\`\`\`dxl
// DXL - Créer un type de lien
LinkModule lm = create("satisfiedBy",
    "System Requirements",
    "Software Requirements")

// Propriétés du lien
lm.description = "Lien de satisfaction entre exigences système et logiciel"
lm.isDirectional = true
\`\`\`

## 3. Suspect Links (Liens suspects)

Quand une exigence source est modifiée, tous les liens vers cette exigence deviennent **suspects**. C'est le mécanisme clé de l'analyse d'impact :

\`\`\`dxl
// DXL - Identifier les liens suspects
Module m = current
Object o
Link l

for o in entire m do {
    for l in all(o -> "*") do {
        if (suspect(l)) {
            print "Lien suspect: " identifier(o) " -> " target(l) "\\n"
            print "  Raison: modification de la source le " lastModified(o) "\\n"
        }
    }
}
\`\`\`

### Processus de gestion des suspects

\`\`\`
1. Modification d'une exigence source
   ↓
2. DOORS marque automatiquement les liens sortants comme suspects
   ↓
3. L'analyste examine chaque lien suspect
   ↓
4. Pour chaque lien :
   a. Si la modification impacte la cible → mettre à jour la cible
   b. Si pas d'impact → effacer le flag suspect
   ↓
5. Documenter la décision dans l'historique
\`\`\`

\`\`\`dxl
// DXL - Effacer les suspects après analyse
Module m = current
Object o
Link l

for o in entire m do {
    for l in all(o -> "satisfiedBy") do {
        if (suspect(l)) {
            // Après vérification manuelle
            clearSuspect(l)
            print "Suspect effacé: " identifier(o) "\\n"
        }
    }
}
\`\`\`

## 4. Analyse d'impact complète

\`\`\`dxl
// DXL - Script d'analyse d'impact
pragma runLim, 0

Module srcMod = read("/Project/System_Requirements", true)
Module tgtMod = read("/Project/Software_Requirements", true)

Object src, tgt
Link l
int impactCount = 0

// Rapport d'impact
Stream report = write("impact_report.csv")
report << "Source ID,Source Text,Target ID,Target Text,Status\\n"

for src in entire srcMod do {
    if (lastModified(src) > baseline("v2.0", srcMod)) {
        for l in all(src -> "satisfiedBy") do {
            tgt = target(l)
            if (!null tgt) {
                report << identifier(src) ","
                report << "\\\"" plainText(src."Object Text") "\\\","
                report << identifier(tgt) ","
                report << "\\\"" plainText(tgt."Object Text") "\\\","
                if (suspect(l)) {
                    report << "SUSPECT\\n"
                } else {
                    report << "OK\\n"
                }
                impactCount++
            }
        }
    }
}

print "Nombre d'impacts identifiés: " impactCount "\\n"
close(report)
\`\`\`

## 5. Baselines

Les baselines capturent un état immutable du module à un instant donné :

\`\`\`dxl
// DXL - Créer une baseline
Module m = current

// Créer une baseline majeure
Baseline b = create(m, "Release 2.0",
    "Baseline de release pour la revue CDR",
    major)

// Créer une baseline mineure
Baseline bm = create(m, "Sprint-15",
    "Fin du sprint 15 - exigences validées",
    minor)

// Lister les baselines
Baseline bl
for bl in all(m) do {
    print name(bl) " - " dateOf(bl) " - " annotation(bl) "\\n"
}
\`\`\`

### Comparer des baselines

\`\`\`dxl
// DXL - Comparer deux baselines
Module m = current
Baseline b1 = baseline("v1.0", m)
Baseline b2 = baseline("v2.0", m)

Object o
string oldText, newText

for o in entire m do {
    oldText = probeBaseline_(b1, o, "Object Text")
    newText = probeBaseline_(b2, o, "Object Text")
    if (oldText != newText) {
        print "Modifié: " identifier(o) "\\n"
        print "  Avant: " oldText "\\n"
        print "  Après: " newText "\\n"
    }
}
\`\`\`

## 6. Historique et audit trail

\`\`\`dxl
// DXL - Extraire l'historique d'un objet
Object o = current
History h

for h in all(o) do {
    print dateOf(h) " | " author(h) " | " typeOf(h) "\\n"
    if (typeOf(h) == modifyType) {
        print "  Champ: " attrName(h) "\\n"
        print "  Ancienne valeur: " oldValue(h) "\\n"
        print "  Nouvelle valeur: " newValue(h) "\\n"
    }
}
\`\`\``,
    practiceContent: `# Exercices pratiques - Analyse d'impact et baselines

## Exercice 1 : Créer des liens de traçabilité

Établissez la traçabilité entre modules :
1. Ouvrez le module System Requirements
2. Créez des liens "satisfiedBy" vers Software Requirements
3. Vérifiez la matrice de traçabilité

## Exercice 2 : Gérer les liens suspects

\`\`\`dxl
// Modifiez une exigence système
// Vérifiez que les liens deviennent suspects
// Script pour lister tous les suspects
Module m = current
Object o
Link l
for o in entire m do {
    for l in all(o -> "*") do {
        if (suspect(l)) {
            print identifier(o) " -> suspect link detected\\n"
        }
    }
}
\`\`\`

## Exercice 3 : Créer et comparer des baselines

1. Créez une baseline "v1.0" du module
2. Modifiez quelques exigences
3. Créez une baseline "v2.0"
4. Comparez les deux baselines

## Exercice 4 : Rapport d'analyse d'impact

Écrivez un script DXL qui génère un rapport CSV listant toutes les exigences impactées par les changements depuis la dernière baseline.`,
    keyPoints: JSON.stringify(['Les liens suspects sont créés automatiquement quand une exigence source est modifiée', 'L\'analyse d\'impact évalue les conséquences d\'un changement sur toute la chaîne de traçabilité', 'Les baselines capturent un état immutable du module pour référence et audit', 'La comparaison de baselines identifie précisément les changements entre versions', 'Le processus de gestion des suspects inclut l\'analyse, la décision et la documentation', 'Les scripts DXL automatisent l\'analyse d\'impact à grande échelle', 'L\'historique complet de chaque objet est conservé pour l\'audit trail', 'Les baselines majeures et mineures structurent les jalons du projet']),
  },

  // ============================================================
  // DOORS - Module 5: Import/Export et intégrations
  // ============================================================
  {
    id: 'doors-05',
    courseId: 'doors',
    title: 'Import/Export et intégrations',
    duration: '3h',
    orderIndex: 5,
    theoryContent: `# Import/Export et Intégrations DOORS

## 1. Introduction

IBM DOORS s'intègre dans un écosystème d'outils d'ingénierie. L'import et l'export de données permettent d'échanger des exigences avec d'autres outils (Excel, Word, ReqIF), tandis que les standards OSLC (Open Services for Lifecycle Collaboration) permettent des intégrations en temps réel avec les outils Rational et tiers.

## 2. Import/Export Excel

### Export vers Excel

\`\`\`dxl
// DXL - Export vers Excel (TSV)
pragma runLim, 0
Module m = current
Object o
Stream out = write("export_requirements.tsv")

// En-têtes
out << "ID\\tText\\tPriority\\tStatus\\tAuthor\\n"

for o in entire m do {
    if (isDeleted(o)) continue
    out << identifier(o) "\\t"
    out << plainText(o."Object Text") "\\t"
    out << o."Priority" "\\t"
    out << o."Status" "\\t"
    out << o."Created By" "\\n"
}

close(out)
print "Export terminé.\\n"
\`\`\`

### Import depuis Excel

\`\`\`dxl
// DXL - Import depuis Excel (TSV)
pragma runLim, 0
Module m = current
Stream inp = read("import_requirements.tsv")
string line, fields[]
int count = 0

// Ignorer l'en-tête
line = inp.getLine

while (!end(inp)) {
    line = inp.getLine
    if (length(line) == 0) continue

    int n = split(line, fields, "\\t")
    if (n >= 3) {
        Object o = create(m, last, fields[1])
        o."Priority" = fields[2]
        o."Status" = "New"
        count++
    }
}

close(inp)
refresh(m)
print count " exigences importées.\\n"
\`\`\`

## 3. ReqIF (Requirements Interchange Format)

ReqIF est le standard OMG pour l'échange d'exigences entre outils :

\`\`\`xml
<!-- Exemple de structure ReqIF -->
<?xml version="1.0" encoding="UTF-8"?>
<REQ-IF xmlns="http://www.omg.org/spec/ReqIF/20110401/reqif.xsd">
  <CORE-CONTENT>
    <REQ-IF-CONTENT>
      <DATATYPES>
        <DATATYPE-DEFINITION-STRING IDENTIFIER="DT-001"
          LONG-NAME="Text" MAX-LENGTH="4000"/>
      </DATATYPES>
      <SPEC-TYPES>
        <SPEC-OBJECT-TYPE IDENTIFIER="SOT-001" LONG-NAME="Requirement">
          <SPEC-ATTRIBUTES>
            <ATTRIBUTE-DEFINITION-STRING IDENTIFIER="AD-001"
              LONG-NAME="ReqText">
              <TYPE><DATATYPE-DEFINITION-STRING-REF>DT-001</DATATYPE-DEFINITION-STRING-REF></TYPE>
            </ATTRIBUTE-DEFINITION-STRING>
          </SPEC-ATTRIBUTES>
        </SPEC-OBJECT-TYPE>
      </SPEC-TYPES>
      <SPEC-OBJECTS>
        <SPEC-OBJECT IDENTIFIER="REQ-001" LAST-CHANGE="2024-01-15">
          <VALUES>
            <ATTRIBUTE-VALUE-STRING THE-VALUE="Le système doit répondre en moins de 200ms">
              <DEFINITION><ATTRIBUTE-DEFINITION-STRING-REF>AD-001</ATTRIBUTE-DEFINITION-STRING-REF></DEFINITION>
            </ATTRIBUTE-VALUE-STRING>
          </VALUES>
        </SPEC-OBJECT>
      </SPEC-OBJECTS>
    </REQ-IF-CONTENT>
  </CORE-CONTENT>
</REQ-IF>
\`\`\`

\`\`\`bash
# Import ReqIF dans DOORS via l'interface
# File > Import > ReqIF
# Sélectionner le fichier .reqif ou .reqifz (compressé)
# Mapper les types d'attributs
# Choisir le module de destination
\`\`\`

## 4. OSLC (Open Services for Lifecycle Collaboration)

OSLC permet l'intégration en temps réel entre outils :

\`\`\`bash
# Interroger les exigences via OSLC
curl -X GET "https://doors-server:9443/rm/discovery/catalog" \\
  -H "Accept: application/rdf+xml" \\
  -H "OSLC-Core-Version: 2.0"

# Récupérer une exigence spécifique
curl -X GET "https://doors-server:9443/rm/resources/RE_12345" \\
  -H "Accept: application/json" \\
  -H "Authorization: Basic <credentials>"

# Créer une exigence via OSLC
curl -X POST "https://doors-server:9443/rm/resources" \\
  -H "Content-Type: application/json" \\
  -H "OSLC-Core-Version: 2.0" \\
  -d '{
    "dcterms:title": "Nouvelle exigence via OSLC",
    "dcterms:description": "Description de l exigence",
    "oslc_rm:requirement_type": "Functional"
  }'
\`\`\`

## 5. Intégration avec les outils Rational

### DOORS et Rational Team Concert (RTC)

\`\`\`
DOORS (Exigences) <──OSLC──> RTC (Work Items)
     │                            │
     │  satisfiedBy               │ implementedBy
     │                            │
     └────────> Rhapsody ─────────┘
                (Modèles UML)
\`\`\`

### DOORS et Rational Quality Manager (RQM)

\`\`\`
Exigences DOORS ──validates──> Plans de test RQM
                                     │
                                     │ executes
                                     ▼
                              Résultats de test
\`\`\`

## 6. Automatisation avec DXL et API

\`\`\`dxl
// DXL - Export Word avec mise en forme
pragma runLim, 0

OleAutoObj word, docs, doc, selection
word = oleCreateAutoObject("Word.Application")
oleMethod(word, "Documents.Add")
docs = oleGetResult(word, "Documents")
doc = oleGetResult(docs, "Item", 1)
selection = oleGetResult(word, "Selection")

Module m = current
Object o
for o in entire m do {
    // Écrire l'identifiant en gras
    oleMethod(selection, "Font.Bold", true)
    oleMethod(selection, "TypeText", identifier(o) ": ")
    oleMethod(selection, "Font.Bold", false)
    oleMethod(selection, "TypeText", plainText(o."Object Text"))
    oleMethod(selection, "TypeParagraph")
}

// Sauvegarder
oleMethod(doc, "SaveAs", "C:\\\\export\\\\requirements.docx")
oleMethod(word, "Quit")
\`\`\``,
    practiceContent: `# Exercices pratiques - Import/Export et intégrations

## Exercice 1 : Export vers Excel

Exportez un module complet avec tous les attributs :

\`\`\`dxl
Module m = current
Object o
Stream out = write("full_export.tsv")
out << "ID\\tLevel\\tText\\tPriority\\tStatus\\n"
for o in entire m do {
    out << identifier(o) "\\t" level(o) "\\t"
    out << plainText(o."Object Text") "\\t"
    out << o."Priority" "\\t" o."Status" "\\n"
}
close(out)
\`\`\`

## Exercice 2 : Import depuis un fichier

Préparez un fichier TSV et importez-le dans un nouveau module.

## Exercice 3 : Export ReqIF

1. Sélectionnez un module à exporter
2. File > Export > ReqIF
3. Configurez le mapping des attributs
4. Vérifiez le fichier .reqif généré

## Exercice 4 : Requête OSLC

\`\`\`bash
# Interroger le catalogue OSLC
curl "https://doors-server:9443/rm/discovery/catalog" \\
  -H "Accept: application/json"

# Lister les exigences d'un module
curl "https://doors-server:9443/rm/resources?oslc.where=dcterms:title='SRS'" \\
  -H "Accept: application/json"
\`\`\``,
    keyPoints: JSON.stringify(['L\'export Excel/TSV via DXL permet de partager les exigences avec les parties prenantes', 'L\'import depuis Excel nécessite un mapping d\'attributs et une validation des données', 'ReqIF est le standard OMG pour l\'échange interopérable d\'exigences entre outils', 'OSLC permet l\'intégration en temps réel entre DOORS, RTC, RQM et outils tiers', 'Les liens OSLC créent une traçabilité cross-outils sans duplication de données', 'L\'automatisation DXL avec OLE permet de générer des documents Word formatés', 'Le format ReqIF compressé (.reqifz) inclut les pièces jointes et images', 'La configuration du mapping d\'attributs est critique pour la qualité de l\'import']),
  },


  // ============================================================
  // CLEARCASE - Module 4: UCM avancé
  // ============================================================
  {
    id: 'cc-04',
    courseId: 'clearcase',
    title: 'UCM avancé',
    duration: '3h',
    orderIndex: 4,
    theoryContent: `# UCM Avancé dans ClearCase

## 1. Introduction

**UCM** (Unified Change Management) est le modèle de gestion de configuration de ClearCase qui structure le travail en activités, streams et baselines. UCM avancé couvre les scénarios complexes : streams hiérarchiques, deliver/rebase croisés, composite baselines et gestion d'intégration multi-équipes.

UCM avancé permet de :
- Gérer des projets multi-composants
- Orchestrer l'intégration entre équipes
- Créer des baselines composites pour les releases
- Automatiser les opérations de deliver et rebase

## 2. Architecture UCM

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    UCM Project                            │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Integration Stream (main)                               │
│  ├── Baseline: APP_V2.0_RC1                             │
│  │                                                       │
│  ├── Dev Stream: team-frontend                           │
│  │   ├── Activity: FEAT-123-new-ui                      │
│  │   └── Activity: BUG-456-fix-layout                   │
│  │                                                       │
│  ├── Dev Stream: team-backend                            │
│  │   ├── Activity: FEAT-789-api-v2                      │
│  │   └── Activity: PERF-012-optimize-queries            │
│  │                                                       │
│  └── Dev Stream: team-qa                                 │
│      └── Activity: TEST-345-integration-tests            │
│                                                          │
└─────────────────────────────────────────────────────────┘
\`\`\`

## 3. Activités et changesets

\`\`\`bash
# Créer une activité
cleartool mkactivity -headline "FEAT-123: Nouvelle interface utilisateur" feat-123-new-ui

# Lister les activités du stream courant
cleartool lsactivity -short -in stream:team-frontend@/vobs/pvob

# Voir le changeset d'une activité
cleartool lsactivity -long -changeset feat-123-new-ui@/vobs/pvob

# Changer d'activité
cleartool setactivity feat-123-new-ui

# Compléter une activité
cleartool chactivity -complete feat-123-new-ui
\`\`\`

## 4. Deliver (livraison)

Le deliver pousse les changements d'un stream de développement vers le stream d'intégration :

\`\`\`bash
# Deliver simple
cleartool deliver -stream team-frontend@/vobs/pvob \\
  -to stream:integration@/vobs/pvob \\
  -activities feat-123-new-ui,bug-456-fix-layout \\
  -complete

# Deliver avec preview (dry-run)
cleartool deliver -preview -stream team-frontend@/vobs/pvob

# Deliver avec résolution de conflits
cleartool deliver -stream team-frontend@/vobs/pvob \\
  -force
# En cas de conflit :
cleartool findmerge . -flatest -merge -log merge.log

# Annuler un deliver en cours
cleartool deliver -cancel -stream team-frontend@/vobs/pvob
\`\`\`

## 5. Rebase (mise à jour)

Le rebase met à jour un stream de développement avec les dernières baselines du stream parent :

\`\`\`bash
# Rebase depuis la dernière baseline
cleartool rebase -stream team-frontend@/vobs/pvob \\
  -baseline APP_V2.0_BL15@/vobs/pvob \\
  -complete

# Rebase avec preview
cleartool rebase -preview -stream team-frontend@/vobs/pvob

# Vérifier les conflits potentiels
cleartool findmerge . -flatest -print

# Rebase recommandé (recommended baseline)
cleartool rebase -recommended -stream team-frontend@/vobs/pvob -complete
\`\`\`

## 6. Composite Baselines

Les composite baselines regroupent plusieurs composants :

\`\`\`bash
# Créer une baseline simple
cleartool mkbl -component app-core@/vobs/pvob \\
  -view integration_view \\
  APP_CORE_V2.0

# Créer une composite baseline
cleartool mkbl -component app-system@/vobs/pvob \\
  -view integration_view \\
  -full \\
  APP_SYSTEM_V2.0_RC1

# Structure composite
# APP_SYSTEM_V2.0_RC1 (composite)
#   ├── APP_CORE_V2.0
#   ├── APP_UI_V2.0
#   ├── APP_API_V2.0
#   └── APP_DB_V2.0

# Promouvoir une baseline
cleartool chbl -level RELEASED APP_SYSTEM_V2.0_RC1@/vobs/pvob

# Niveaux de promotion : INITIAL -> BUILT -> TESTED -> RELEASED -> REJECTED

# Recommander une baseline
cleartool chstream -recommended APP_SYSTEM_V2.0_RC1@/vobs/pvob \\
  stream:integration@/vobs/pvob

# Lister les baselines
cleartool lsbl -stream integration@/vobs/pvob -component app-core@/vobs/pvob
\`\`\`

## 7. Streams hiérarchiques et multi-projets

\`\`\`bash
# Créer un stream enfant pour une feature branch
cleartool mkstream -in stream:integration@/vobs/pvob \\
  -baseline APP_V2.0_BL15@/vobs/pvob \\
  feature-stream@/vobs/pvob

# Inter-project deliver (entre projets)
cleartool deliver -stream team-a-dev@/vobs/pvob \\
  -to stream:shared-integration@/vobs/pvob \\
  -target project-b@/vobs/pvob

# Comparaison de streams
cleartool diffbl -activities \\
  baseline:APP_V2.0_BL15@/vobs/pvob \\
  baseline:APP_V2.0_BL16@/vobs/pvob
\`\`\``,
    practiceContent: `# Exercices pratiques - UCM avancé

## Exercice 1 : Workflow complet activité

\`\`\`bash
# Créer et travailler sur une activité
cleartool setview dev_view
cleartool setactivity -new "FEAT-100: Add login page" feat-100

# Modifier des fichiers
cleartool checkout -nc src/login.java
# ... éditer ...
cleartool checkin -c "Implement login form" src/login.java

# Compléter l'activité
cleartool chactivity -complete feat-100
\`\`\`

## Exercice 2 : Deliver et gestion de conflits

\`\`\`bash
# Prévisualiser le deliver
cleartool deliver -preview

# Effectuer le deliver
cleartool deliver -complete

# Si conflits : résoudre avec findmerge
cleartool findmerge . -flatest -merge
\`\`\`

## Exercice 3 : Composite baselines

Créez une composite baseline regroupant 3 composants et promouvez-la :

\`\`\`bash
cleartool mkbl -full -component system@/vobs/pvob SYSTEM_V1.0
cleartool chbl -level TESTED SYSTEM_V1.0@/vobs/pvob
cleartool chstream -recommended SYSTEM_V1.0@/vobs/pvob stream:int@/vobs/pvob
\`\`\`

## Exercice 4 : Rebase et synchronisation

\`\`\`bash
# Rebase vers la baseline recommandée
cleartool rebase -recommended -complete
# Vérifier l'état du stream
cleartool lsstream -long
\`\`\``,
    keyPoints: JSON.stringify(['UCM structure le travail en projets, streams, activités et baselines', 'Le deliver pousse les changements d\'un stream de développement vers l\'intégration', 'Le rebase met à jour un stream avec les dernières baselines du parent', 'Les composite baselines regroupent les baselines de plusieurs composants en une release cohérente', 'Les niveaux de promotion (INITIAL, BUILT, TESTED, RELEASED) tracent la maturité des baselines', 'Les activités regroupent les changements liés à une même tâche (changeset)', 'La baseline recommandée indique la version stable pour le rebase des équipes', 'Les conflits de deliver/rebase se résolvent avec findmerge et le merge manager']),
  },

  // ============================================================
  // CLEARCASE - Module 5: Migration vers Git
  // ============================================================
  {
    id: 'cc-05',
    courseId: 'clearcase',
    title: 'Migration vers Git',
    duration: '3h',
    orderIndex: 5,
    theoryContent: `# Migration de ClearCase vers Git

## 1. Introduction

La migration de ClearCase vers Git est un projet stratégique pour de nombreuses organisations. Git offre de meilleures performances, un écosystème plus riche et une compatibilité avec les pratiques DevOps modernes. Cependant, la migration nécessite une planification minutieuse car les modèles sont fondamentalement différents.

Différences clés :
- ClearCase : centralé, vues dynamiques, versionning par fichier
- Git : distribué, snapshots complets, branches légères
- ClearCase UCM : streams et activités ≠ Git : branches et commits

## 2. Stratégies de migration

### Approche Big Bang

\`\`\`
Jour J : ClearCase (lecture seule) → Git (actif)
+ Simple, coupure nette
- Risque élevé, pas de retour arrière
- Nécessite que tout soit prêt
\`\`\`

### Approche parallèle (recommandée)

\`\`\`
Phase 1: ClearCase (actif)  + Git (mirror, lecture seule)
Phase 2: ClearCase (actif)  + Git (pilote, quelques équipes)
Phase 3: ClearCase (lecture) + Git (actif, toutes les équipes)
Phase 4: ClearCase (archive) + Git (seul)

Durée typique : 3-12 mois selon la taille
\`\`\`

## 3. Outils de migration

### git-cc (bridge ClearCase-Git)

\`\`\`bash
# Installation de git-cc
pip install git-cc

# Configuration
git init myproject
cd myproject
cat > .gitcc <<EOF
[master]
clearcase = /vobs/myproject
branches = main|integration
include = src/|docs/|config/
exclude = build/|tmp/
EOF

# Synchronisation initiale (ClearCase → Git)
gitcc rebase

# Synchronisation continue
gitcc rebase --stash

# Pousser les changements Git vers ClearCase
gitcc checkin
\`\`\`

### Migration avec historique sélectif

\`\`\`bash
#!/bin/bash
# Script de migration avec historique des baselines

VOB="/vobs/myproject"
GIT_REPO="/migration/myproject"

# Initialiser le repo Git
git init \\\$GIT_REPO
cd \\\$GIT_REPO

# Pour chaque baseline importante
for BL in BL_1.0 BL_2.0 BL_3.0 CURRENT; do
    echo "Migration de la baseline: \\\$BL"

    # Monter une vue snapshot sur la baseline
    cleartool mkview -snapshot -tag mig_\\\$BL \\
      -stream integration@/vobs/pvob \\
      /views/mig_\\\$BL

    # Configurer la config spec pour la baseline
    cleartool catcs -tag mig_\\\$BL

    # Copier les fichiers
    rsync -av --exclude='.ccrc' /views/mig_\\\$BL/\\\$VOB/ \\\$GIT_REPO/

    # Commit Git
    git add -A
    git commit -m "Import baseline \\\$BL" --date="\\\$(cleartool lsbl -fmt '%d' \\\$BL)"
    git tag "\\\$BL"

    # Nettoyer
    cleartool rmview -tag mig_\\\$BL
done
\`\`\`

## 4. Migration des branches et de l'historique

\`\`\`bash
#!/bin/bash
# Migration avancée avec historique par activité

# Extraire les activités ordonnées par date
cleartool lsactivity -fmt "%d|%n|%[headline]p\\n" \\
  -in stream:integration@/vobs/pvob | sort > activities.txt

# Pour chaque activité, créer un commit
while IFS='|' read -r date activity headline; do
    # Obtenir le changeset
    changeset=\\\$(cleartool lsactivity -fmt "%[versions]p" \\\$activity)

    if [ -n "\\\$changeset" ]; then
        # Checkout des fichiers modifiés
        for version in \\\$changeset; do
            file=\\\$(echo \\\$version | sed 's|@@.*||')
            cp "/view/mig_view\\\$file" "\\\$GIT_REPO/\\\$file" 2>/dev/null
        done

        git add -A
        git commit -m "\\\$headline" \\
          --date="\\\$date" \\
          --author="\\\$(cleartool lsactivity -fmt '%[owner]p' \\\$activity) <>"
    fi
done < activities.txt
\`\`\`

## 5. Mapping des concepts

\`\`\`
ClearCase UCM          →    Git
─────────────────────────────────────
VOB                    →    Repository
Stream (integration)   →    main branch
Stream (development)   →    feature branch
Activity               →    Commit(s)
Baseline               →    Tag
Deliver                →    Merge/Pull Request
Rebase                 →    git merge main / git rebase main
Composite baseline     →    Git submodules ou monorepo
View (dynamic)         →    git clone / git worktree
View (snapshot)        →    git clone
UCM Project            →    GitHub/GitLab project
\`\`\`

## 6. Bonnes pratiques de migration

\`\`\`bash
# Valider la migration
# 1. Comparer les fichiers
diff -r /view/clearcase_view/vobs/project/ /git/project/ \\
  --exclude=".git" --exclude="lost+found"

# 2. Vérifier le nombre de fichiers
find /view/clearcase_view/vobs/project -type f | wc -l
find /git/project -type f -not -path ".git/*" | wc -l

# 3. Comparer les checksums
find /view/clearcase_view/vobs/project -type f -exec md5sum {} \\; | sort > cc_checksums.txt
find /git/project -type f -not -path ".git/*" -exec md5sum {} \\; | sort > git_checksums.txt
diff cc_checksums.txt git_checksums.txt
\`\`\`

## 7. Formation des équipes

Plan de formation post-migration :
1. Git basics (2 jours) : clone, commit, push, pull, branches
2. Workflows (1 jour) : GitFlow, trunk-based, pull requests
3. Outils (1 jour) : IDE integration, CI/CD, code review
4. Avancé (1 jour) : rebase, cherry-pick, bisect, hooks`,
    practiceContent: `# Exercices pratiques - Migration vers Git

## Exercice 1 : Installer et configurer git-cc

\`\`\`bash
pip install git-cc
git init migration-test
cd migration-test

# Configurer le bridge
cat > .gitcc <<EOF
[master]
clearcase = /vobs/test_project
include = src/
EOF

gitcc rebase
\`\`\`

## Exercice 2 : Script de migration par baselines

Écrivez un script qui migre les 5 dernières baselines avec leurs tags :

\`\`\`bash
#!/bin/bash
baselines=\\\$(cleartool lsbl -short -stream int@/vobs/pvob | tail -5)
for bl in \\\$baselines; do
    # Exporter et committer chaque baseline
    echo "Migrating \\\$bl..."
done
\`\`\`

## Exercice 3 : Valider la migration

\`\`\`bash
# Comparer le contenu final
diff -rq /view/cc_latest/ /git/repo/ --exclude=".git"
echo "Fichiers différents: \\\$?"
\`\`\`

## Exercice 4 : Mapping des workflows

Documentez le nouveau workflow Git qui remplace le workflow UCM :
- Stream → Branch
- Deliver → Pull Request + Merge
- Rebase → git pull --rebase origin main`,
    keyPoints: JSON.stringify(['La migration parallèle avec période de coexistence réduit les risques', 'git-cc offre un bridge bidirectionnel entre ClearCase et Git pendant la transition', 'Le mapping Stream→Branch et Activity→Commit guide la conversion des concepts', 'La migration de l\'historique peut être sélective (baselines) ou complète (activités)', 'Les composite baselines se traduisent en tags Git ou en submodules selon le contexte', 'La validation post-migration compare checksums et nombre de fichiers entre les deux systèmes', 'La formation des équipes est un facteur critique de succès de la migration', 'L\'approche progressive par équipes pilotes permet de valider le processus avant la généralisation']),
  },


  // ============================================================
  // KLOCWORK - Module 4: Conformité MISRA et CERT
  // ============================================================
  {
    id: 'kw-04',
    courseId: 'klocwork',
    title: 'Conformité MISRA et CERT',
    duration: '3h',
    orderIndex: 4,
    theoryContent: `# Conformité MISRA et CERT avec Klocwork

## 1. Introduction

Klocwork est un outil d'analyse statique qui supporte les standards de codage **MISRA C/C++** et **CERT C/C++**, essentiels dans les domaines critiques : automobile (ISO 26262), aéronautique (DO-178C), médical (IEC 62304) et ferroviaire (EN 50128).

La conformité à ces standards :
- Est souvent requise pour la certification
- Réduit les défauts logiciels critiques
- Documente les pratiques de codage sûr
- Fournit une preuve d'assurance qualité

## 2. Standards MISRA

### MISRA C:2012

MISRA C:2012 contient 143 règles réparties en catégories :

\`\`\`
Catégories de règles :
- Mandatory (obligatoires) : 10 règles - aucune déviation permise
- Required (requises) : 101 règles - déviation possible avec justification
- Advisory (consultatives) : 32 règles - bonnes pratiques recommandées

Exemples de règles :
- Rule 11.3 (Required) : pas de cast entre pointeur vers objet et pointeur vers type différent
- Rule 17.7 (Required) : la valeur de retour d'une fonction non-void doit être utilisée
- Rule 21.3 (Required) : ne pas utiliser malloc/free (mémoire dynamique interdite)
\`\`\`

### Configuration des checkers MISRA dans Klocwork

\`\`\`bash
# Activer les checkers MISRA C:2012
kwcheck --taxonomy "MISRA C 2012" --enable-all

# Configuration dans le fichier de taxonomie
# klocwork_project/.kwlp/taxonomies/misra_c_2012.tconf
taxonomy MISRA_C_2012 {
    checker MISRA.CAST.PTR_TO_INT {
        enabled = true
        severity = "Critical"
        rule_id = "Rule 11.4"
    }
    checker MISRA.FUNC.NODECL {
        enabled = true
        severity = "Error"
        rule_id = "Rule 8.2"
    }
    checker MISRA.STDLIB.MEMORY {
        enabled = true
        severity = "Critical"
        rule_id = "Rule 21.3"
    }
}

# Lancer l'analyse avec le profil MISRA
kwbuildproject --tables-directory kwtables myproject.out \\
  --taxonomy MISRA_C_2012
\`\`\`

## 3. Standard CERT C

Le CERT C Coding Standard définit des règles pour éviter les vulnérabilités de sécurité :

\`\`\`
Catégories CERT C :
- PRE : Préprocesseur
- DCL : Déclarations et Initialisation
- EXP : Expressions
- INT : Entiers
- FLP : Virgule flottante
- ARR : Tableaux
- STR : Chaînes de caractères
- MEM : Gestion mémoire
- FIO : Entrées/Sorties
- ENV : Environnement
- SIG : Signaux
- ERR : Gestion d'erreurs
- CON : Concurrence
- MSC : Divers
\`\`\`

\`\`\`bash
# Configurer les checkers CERT
kwcheck --taxonomy "CERT C" --enable-all

# Exemples de checkers CERT dans Klocwork
# CERT.MEM.FREE_FREED : double free (MEM30-C)
# CERT.STR.OVERFLOW : buffer overflow (STR31-C)
# CERT.INT.OVERFLOW : integer overflow (INT32-C)
# CERT.FIO.RACE : race condition sur fichier (FIO01-C)
\`\`\`

## 4. Rapports de conformité

\`\`\`bash
# Générer un rapport de conformité MISRA
kwreport --format html --taxonomy "MISRA C 2012" \\
  --output misra_compliance_report.html \\
  --project myproject

# Rapport CSV pour analyse
kwreport --format csv --taxonomy "MISRA C 2012" \\
  --columns "rule,severity,file,line,message,status" \\
  --output misra_report.csv

# Résumé de conformité (GRP - Guideline Re-categorization Plan)
kwquery --taxonomy "MISRA C 2012" \\
  --summary-by-rule \\
  --include-deviations
\`\`\`

### Matrice de conformité

\`\`\`
Rapport de conformité MISRA C:2012
═══════════════════════════════════
Total rules applicable : 143
Rules compliant        : 128 (89.5%)
Rules with deviations  : 8  (5.6%)
Rules non-compliant    : 7  (4.9%)

Détail des déviations :
Rule 11.3 - Déviation #DEV-001 : cast nécessaire pour registre hardware
  Justification : accès mémoire mappé, pas de risque runtime
  Approuvé par : Safety Manager, 2024-01-15

Rule 21.3 - Déviation #DEV-002 : malloc utilisé dans le module init
  Justification : allocation unique au démarrage, jamais libérée
  Approuvé par : Safety Manager, 2024-01-20
\`\`\`

## 5. Gestion des déviations

\`\`\`c
// Annotation dans le code pour documenter une déviation
/* DEVIATION: MISRA Rule 11.3
 * Justification: Hardware register access requires pointer cast
 * Risk: None - memory-mapped I/O at fixed address
 * Approved: DEV-001, Safety Manager, 2024-01-15
 */
volatile uint32_t *reg = (volatile uint32_t *)0x40021000; // NOLINT(misra-c2012-11.3)
\`\`\`

\`\`\`bash
# Marquer une issue comme déviation dans Klocwork
kwcheck set-status --issue 12345 --status "Analyze" \\
  --comment "DEVIATION DEV-001: Hardware register access"

# Exporter les déviations
kwquery --status "Analyze" --taxonomy "MISRA C 2012" \\
  --format json > deviations.json
\`\`\`

## 6. Certification et audit

Pour les projets certifiés, Klocwork fournit :
- Le **Tool Qualification Pack** (TQP) pour DO-178C
- La documentation de la couverture des règles
- La traçabilité entre règles et checkers
- Les rapports de validité de l'outil (false positives/negatives)`,
    practiceContent: `# Exercices pratiques - Conformité MISRA et CERT

## Exercice 1 : Configurer un projet MISRA

\`\`\`bash
# Créer un projet avec le profil MISRA
kwinject make -f Makefile
kwbuildproject --tables-directory tables kwinject.out \\
  --taxonomy "MISRA C 2012"

# Vérifier les résultats
kwcheck list --taxonomy "MISRA C 2012" --severity 1,2
\`\`\`

## Exercice 2 : Analyser du code non conforme

Analysez ce code et identifiez les violations :

\`\`\`c
#include <stdlib.h>
void process(int *data, int size) {
    int *copy = (int *)malloc(size * sizeof(int)); // Rule 21.3
    for (int i = 0; i <= size; i++) {  // Off-by-one
        copy[i] = data[i];
    }
    // Missing free - MEM31-C
}
\`\`\`

## Exercice 3 : Documenter une déviation

Créez un processus de déviation avec justification, approbation et traçabilité.

## Exercice 4 : Générer un rapport de certification

\`\`\`bash
# Rapport complet pour audit
kwreport --format html \\
  --taxonomy "MISRA C 2012" \\
  --include-deviations \\
  --summary \\
  --output certification_report.html
\`\`\``,
    keyPoints: JSON.stringify(['MISRA C:2012 contient 143 règles classées en Mandatory, Required et Advisory', 'CERT C définit des règles de sécurité pour éviter les vulnérabilités courantes', 'Les déviations MISRA doivent être documentées, justifiées et approuvées formellement', 'Le Tool Qualification Pack (TQP) qualifie Klocwork pour les projets certifiés DO-178C', 'Les rapports de conformité montrent le pourcentage de règles satisfaites par catégorie', 'Les annotations dans le code documentent les déviations pour la traçabilité', 'La matrice de conformité est un livrable essentiel pour les audits de certification', 'Les checkers Klocwork couvrent plus de 95% des règles MISRA C:2012 vérifiables statiquement']),
  },

  // ============================================================
  // KLOCWORK - Module 5: Intégration CI/CD et métriques
  // ============================================================
  {
    id: 'kw-05',
    courseId: 'klocwork',
    title: 'Intégration CI/CD et métriques',
    duration: '3h',
    orderIndex: 5,
    theoryContent: `# Intégration CI/CD et Métriques Klocwork

## 1. Introduction

L'intégration de Klocwork dans un pipeline CI/CD automatise l'analyse statique à chaque commit, détectant les défauts au plus tôt dans le cycle de développement. Les métriques et tendances permettent de suivre l'évolution de la qualité du code dans le temps.

L'approche "shift-left" avec Klocwork comprend :
1. **Desktop analysis** : analyse locale avant le commit
2. **CI integration** : analyse complète dans le pipeline
3. **Server analysis** : analyse de référence et tendances
4. **Dashboards** : suivi des métriques de qualité

## 2. Intégration Jenkins

\`\`\`groovy
// Jenkinsfile - Pipeline Klocwork
pipeline {
    agent { label 'linux-build' }

    environment {
        KW_SERVER = 'klocwork.company.com'
        KW_PORT = '8080'
        KW_PROJECT = 'myproject'
        KLOCWORK_LICENSE_HOST = 'license-server'
    }

    stages {
        stage('Build Spec') {
            steps {
                sh '''
                    kwinject --output buildspec.out make -j4 all
                '''
            }
        }

        stage('Klocwork Analysis') {
            steps {
                sh '''
                    kwbuildproject --tables-directory kwtables \\
                      --url http://\\\${KW_SERVER}:\\\${KW_PORT}/\\\${KW_PROJECT} \\
                      --force \\
                      buildspec.out

                    kwadmin --url http://\\\${KW_SERVER}:\\\${KW_PORT} \\
                      load \\\${KW_PROJECT} kwtables
                '''
            }
        }

        stage('Quality Gate') {
            steps {
                sh '''
                    # Vérifier les issues critiques
                    CRITICAL=\\\$(kwquery --url http://\\\${KW_SERVER}:\\\${KW_PORT}/\\\${KW_PROJECT} \\
                      --severity 1 --status "Analyze,New" | wc -l)

                    if [ \\\$CRITICAL -gt 0 ]; then
                        echo "FAILED: \\\$CRITICAL critical issues found"
                        exit 1
                    fi
                '''
            }
        }

        stage('Report') {
            steps {
                sh '''
                    kwreport --url http://\\\${KW_SERVER}:\\\${KW_PORT}/\\\${KW_PROJECT} \\
                      --format html \\
                      --output kw_report.html
                '''
                publishHTML([
                    reportName: 'Klocwork Report',
                    reportDir: '.',
                    reportFiles: 'kw_report.html'
                ])
            }
        }
    }
}
\`\`\`

## 3. Analyse différentielle (Delta Analysis)

L'analyse différentielle ne vérifie que les fichiers modifiés pour un feedback rapide :

\`\`\`bash
# Identifier les fichiers modifiés
git diff --name-only HEAD~1 -- '*.c' '*.h' > changed_files.txt

# Analyse différentielle rapide
kwcheck run --build-spec buildspec.out \\
  --file-list changed_files.txt \\
  --report delta_report.txt

# Intégration dans une PR
kwcheck run --build-spec buildspec.out \\
  --diff-with main \\
  --format json > new_issues.json

# Compter les nouvelles issues uniquement
NEW_ISSUES=\\\$(jq 'length' new_issues.json)
echo "Nouvelles issues introduites: \\\$NEW_ISSUES"
\`\`\`

## 4. Analyse locale (Desktop)

\`\`\`bash
# Installation de kwcheck (analyse locale)
# Configurer la connexion au serveur
kwcheck create --url http://klocwork-server:8080/myproject

# Analyse locale complète
kwcheck run --build-spec buildspec.out

# Analyse d'un fichier spécifique
kwcheck run --build-spec buildspec.out --file src/main.c

# Lister les issues locales
kwcheck list --severity 1,2,3
kwcheck list --checker MISRA.* --format json

# Intégration IDE (Eclipse, VS Code)
# Plugin Klocwork pour analysis en temps réel
\`\`\`

## 5. Dashboards et tendances

### API REST pour les métriques

\`\`\`bash
# Récupérer les métriques du projet
curl "http://klocwork-server:8080/review/api/metrics/\\\$PROJECT" \\
  -H "Authorization: Bearer \\\$TOKEN"

# Tendance des issues par sévérité
curl "http://klocwork-server:8080/review/api/builds/\\\$PROJECT/trend?metric=issues&severity=Critical"

# Export des données pour Grafana
curl "http://klocwork-server:8080/review/api/builds/\\\$PROJECT/history" \\
  -o kw_history.json
\`\`\`

### Métriques clés à suivre

\`\`\`
Métriques de qualité :
- Issues ouvertes par sévérité (Critical, Error, Warning)
- Densité de défauts (issues / KLOC)
- Taux de résolution (issues fermées / total)
- Nouvelles issues par build
- Temps moyen de correction (MTTR)
- Couverture des checkers activés
- Conformité MISRA/CERT (% de règles respectées)
\`\`\`

## 6. Configuration avancée du build

\`\`\`bash
# Build specification pour projets complexes
# CMake
kwinject cmake -B build -DCMAKE_BUILD_TYPE=Release
kwinject cmake --build build

# Cross-compilation (embarqué)
kwinject --variable KW_REPLACE_CC=arm-none-eabi-gcc \\
  make CROSS_COMPILE=arm-none-eabi-

# Projets multi-configurations
kwinject --output buildspec_debug.out make CONFIG=debug
kwinject --output buildspec_release.out make CONFIG=release
kwbuildproject --tables-directory kwtables \\
  buildspec_debug.out buildspec_release.out

# Exclure des répertoires
kwbuildproject --tables-directory kwtables \\
  --exclude "third_party/**" \\
  --exclude "test/**" \\
  buildspec.out
\`\`\``,
    practiceContent: `# Exercices pratiques - CI/CD et métriques

## Exercice 1 : Pipeline d'analyse automatisée

\`\`\`bash
# Script CI simplifié
#!/bin/bash
set -e

# Build spec
kwinject make -j\\\$(nproc)

# Analyse
kwbuildproject --tables-directory tables kwinject.out

# Quality gate
CRITICAL=\\\$(kwcheck list --severity 1 | wc -l)
if [ \\\$CRITICAL -gt 0 ]; then
    echo "FAIL: \\\$CRITICAL critical issues"
    kwcheck list --severity 1
    exit 1
fi
echo "PASS: No critical issues"
\`\`\`

## Exercice 2 : Analyse différentielle sur PR

\`\`\`bash
# Analyser uniquement les fichiers modifiés
git diff --name-only origin/main -- '*.c' '*.h' > files.txt
kwcheck run --file-list files.txt
kwcheck list --format json | jq '.[] | .file + ":" + (.line|tostring) + " " + .message'
\`\`\`

## Exercice 3 : Dashboard de métriques

Créez un script qui collecte les métriques Klocwork et les expose pour Prometheus :

\`\`\`python
from prometheus_client import Gauge, start_http_server
import requests

kw_critical = Gauge('klocwork_critical_issues', 'Critical issues count')
kw_density = Gauge('klocwork_defect_density', 'Defects per KLOC')

def collect():
    data = requests.get('http://kw-server:8080/review/api/metrics/myproject').json()
    kw_critical.set(data['critical_count'])
    kw_density.set(data['defect_density'])
\`\`\`

## Exercice 4 : Configuration cross-compilation

\`\`\`bash
# Configurer pour un projet embarqué ARM
kwinject --variable KW_REPLACE_CC=arm-none-eabi-gcc make
kwbuildproject --tables-directory tables kwinject.out --taxonomy "MISRA C 2012"
\`\`\``,
    keyPoints: JSON.stringify(['kwinject capture les commandes de compilation pour créer le build spec', 'kwbuildproject analyse le code et charge les résultats sur le serveur Klocwork', 'L\'analyse différentielle ne vérifie que les fichiers modifiés pour un feedback rapide', 'Le quality gate bloque le pipeline si des issues critiques sont détectées', 'kwcheck permet l\'analyse locale sans connexion au serveur pour les développeurs', 'Les métriques de tendance (densité, MTTR, nouvelles issues) suivent l\'évolution de la qualité', 'La cross-compilation est supportée via KW_REPLACE_CC pour les projets embarqués', 'L\'API REST permet d\'extraire les données pour des dashboards Grafana personnalisés']),
  },


  // ============================================================
  // JIRA - Module 4: Rapports et métriques avancés
  // ============================================================
  {
    id: 'jira-04',
    courseId: 'jira',
    title: 'Rapports et métriques avancés',
    duration: '3h',
    orderIndex: 4,
    theoryContent: `# Rapports et Métriques Avancés Jira

## 1. Introduction

Au-delà des rapports intégrés de Jira, les équipes ont besoin de métriques avancées pour piloter leur performance Agile. Les gadgets de dashboard, l'intégration avec EazyBI, le suivi du temps et les métriques de vélocité offrent une visibilité complète sur la santé des projets.

Ces métriques permettent de :
- Mesurer la vélocité et la prévisibilité de l'équipe
- Identifier les goulots d'étranglement dans le workflow
- Suivre le temps passé et la capacité
- Créer des rapports pour le management

## 2. Dashboards et Gadgets

\`\`\`
Configuration d'un dashboard performant :

┌─────────────────────────────────────────────────────┐
│  Dashboard "Suivi Sprint"                            │
├────────────────────┬────────────────────────────────┤
│ Sprint Burndown    │  Velocity Chart                │
│ (gadget natif)     │  (6 derniers sprints)          │
├────────────────────┼────────────────────────────────┤
│ Pie Chart          │  Two-Dimensional Filter        │
│ (issues par type)  │  (status x assignee)           │
├────────────────────┼────────────────────────────────┤
│ Filter Results     │  Created vs Resolved           │
│ (bugs critiques)   │  (tendance sur 30 jours)       │
└────────────────────┴────────────────────────────────┘
\`\`\`

### Gadgets avancés

\`\`\`
Gadgets natifs recommandés :
- Sprint Health : santé du sprint en cours
- Cumulative Flow Diagram : flux Kanban
- Control Chart : temps de cycle
- Heat Map : charge par composant
- Resolution Time : temps de résolution
- Wallboard : mode plein écran pour TV

Configuration du gadget "Filter Results" :
- JQL: project = MYPROJ AND type = Bug AND priority in (Critical, Blocker) AND status != Done
- Colonnes: Key, Summary, Assignee, Priority, Created
- Tri: Priority DESC, Created ASC
- Rafraîchissement: 15 minutes
\`\`\`

## 3. EazyBI - Reporting avancé

EazyBI est l'add-on de BI le plus populaire pour Jira :

\`\`\`
# Dimensions disponibles dans EazyBI
- Time : Year > Quarter > Month > Week > Day
- Issue Type : Epic > Story > Sub-task
- Priority : Blocker > Critical > Major > Minor
- Status : Category (To Do, In Progress, Done)
- Sprint : Board > Sprint
- Component, Label, Fix Version
- Custom fields

# Mesures calculées MDX
# Vélocité moyenne sur 6 sprints
WITH MEMBER [Measures].[Avg Velocity] AS
  Avg(
    LastPeriods(6, [Sprint].CurrentMember),
    [Measures].[Story Points resolved]
  )

# Lead time moyen
WITH MEMBER [Measures].[Avg Lead Time] AS
  [Measures].[Days in transition to Done] /
  [Measures].[Issues resolved count]

# Bug escape rate
WITH MEMBER [Measures].[Bug Escape Rate] AS
  [Measures].[Bugs in Production] /
  [Measures].[Issues resolved count] * 100
\`\`\`

## 4. Time Tracking

\`\`\`bash
# Configurer le time tracking
# Administration > Issues > Time Tracking
# - Heures par jour : 8
# - Jours par semaine : 5
# - Format d'entrée : 2h 30m

# API REST - Logger du temps
curl -X POST "https://jira.company.com/rest/api/2/issue/PROJ-123/worklog" \\
  -H "Authorization: Bearer \\\$TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "timeSpent": "2h 30m",
    "started": "2024-01-15T09:00:00.000+0100",
    "comment": "Implémentation du module authentification"
  }'

# Récupérer les worklogs d'une période
curl "https://jira.company.com/rest/api/2/issue/PROJ-123/worklog" \\
  -H "Authorization: Bearer \\\$TOKEN"

# JQL pour le suivi du temps
# Issues avec temps dépassé
worklogDate >= startOfWeek() AND timeSpent > originalEstimate
\`\`\`

## 5. Métriques de vélocité et prévisibilité

\`\`\`
Métriques Scrum essentielles :
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Vélocité : Story Points complétés par sprint
Commitment Reliability : SP complétés / SP engagés * 100%
Sprint Predictability : écart-type de la vélocité sur N sprints
Scope Creep : issues ajoutées après le début du sprint

Métriques Kanban essentielles :
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Lead Time : temps entre création et résolution
Cycle Time : temps entre "In Progress" et "Done"
Throughput : nombre d'issues complétées par semaine
WIP : nombre d'issues en cours simultanément
\`\`\`

## 6. Rapports JQL avancés

\`\`\`jql
# Issues à risque (en cours depuis longtemps)
status was "In Progress" BEFORE -7d AND status = "In Progress"

# Bugs réouverts (qualité des corrections)
status changed FROM "Done" TO "Reopened" AFTER startOfMonth()

# Capacité restante du sprint
sprint in openSprints() AND status != Done AND assignee = currentUser()

# Vélocité : issues résolues par sprint
project = MYPROJ AND issuetype = Story AND resolved >= startOfSprint()

# Temps de cycle moyen (via plugins)
project = MYPROJ AND status changed TO "Done" DURING (startOfWeek(-4), now())
\`\`\``,
    practiceContent: `# Exercices pratiques - Rapports et métriques

## Exercice 1 : Créer un dashboard de pilotage

Configurez un dashboard avec :
1. Burndown Chart du sprint en cours
2. Velocity Chart (6 derniers sprints)
3. Pie Chart des bugs par priorité
4. Created vs Resolved (30 jours)

## Exercice 2 : Requêtes JQL pour le reporting

\`\`\`jql
# Issues bloquées depuis plus de 3 jours
status = "In Progress" AND updated <= -3d

# Taux de bugs par composant
project = MYPROJ AND type = Bug GROUP BY component

# Sprint scope creep
sprint in openSprints() AND created > sprintStartDate()
\`\`\`

## Exercice 3 : Time tracking API

\`\`\`bash
# Logger du temps via l'API
curl -X POST "https://jira.company.com/rest/api/2/issue/PROJ-100/worklog" \\
  -H "Content-Type: application/json" \\
  -d '{"timeSpent":"3h","comment":"Code review et corrections"}'
\`\`\`

## Exercice 4 : Calculer les métriques d'équipe

Créez un script qui calcule automatiquement :
- Vélocité moyenne sur 6 sprints
- Commitment reliability
- Lead time moyen`,
    keyPoints: JSON.stringify(['Les gadgets de dashboard offrent une vue synthétique de la santé du projet', 'EazyBI permet des analyses multidimensionnelles avec des calculs MDX personnalisés', 'La vélocité mesure les Story Points complétés par sprint pour la prévisibilité', 'Le Cycle Time mesure le temps entre le début du travail et sa complétion', 'Le time tracking via API automatise la saisie des temps depuis les outils', 'Les JQL avancés avec status changed et DURING permettent des analyses temporelles', 'Le Cumulative Flow Diagram visualise les goulots d\'étranglement dans le flux', 'Le commitment reliability ratio évalue la fiabilité des engagements de sprint']),
  },

  // ============================================================
  // JIRA - Module 5: Plugins et intégrations
  // ============================================================
  {
    id: 'jira-05',
    courseId: 'jira',
    title: 'Plugins et intégrations',
    duration: '3h',
    orderIndex: 5,
    theoryContent: `# Plugins et Intégrations Jira

## 1. Introduction

L'écosystème de plugins Jira (Atlassian Marketplace) étend considérablement les capacités de la plateforme. Des milliers d'add-ons couvrent le planning, le time tracking, les tests, les automatisations et les intégrations avec des outils tiers.

Les plugins les plus utilisés dans les organisations DevOps :
- **ScriptRunner** : automatisation et scripting Groovy
- **Tempo Timesheets** : gestion du temps avancée
- **BigPicture** : planification portfolio
- **Xray** : gestion des tests
- **Slack/Teams integration** : notifications

## 2. ScriptRunner

ScriptRunner permet d'automatiser Jira avec des scripts Groovy :

\`\`\`groovy
// Script Runner - Post-function : assigner automatiquement
import com.atlassian.jira.component.ComponentAccessor

def issue = issue
def projectLead = issue.projectObject.lead

// Assigner au lead si pas d'assignee
if (!issue.assignee) {
    def userManager = ComponentAccessor.userManager
    def lead = userManager.getUserByKey(projectLead.key)
    issue.setAssignee(lead)
}
\`\`\`

\`\`\`groovy
// Script Runner - Listener : notification sur bug critique
import com.atlassian.jira.event.issue.IssueEvent
import com.atlassian.jira.issue.Issue

def issue = event.issue as Issue

if (issue.issueType.name == "Bug" && issue.priority.name == "Critical") {
    def slackWebhook = "https://hooks.slack.com/services/xxx"
    def payload = """{"text": ":rotating_light: Bug Critique créé: \${issue.key} - \${issue.summary}"}"""

    new URL(slackWebhook).openConnection().with {
        requestMethod = 'POST'
        doOutput = true
        setRequestProperty('Content-Type', 'application/json')
        outputStream.write(payload.bytes)
        inputStream.text
    }
}
\`\`\`

\`\`\`groovy
// Script Runner - Scheduled job : fermer les issues inactives
import com.atlassian.jira.bc.issue.search.SearchService
import com.atlassian.jira.component.ComponentAccessor

def searchService = ComponentAccessor.getComponent(SearchService)
def user = ComponentAccessor.jiraAuthenticationContext.loggedInUser

def jql = 'status = "Waiting for Customer" AND updated <= -30d'
def results = searchService.parseQuery(user, jql)

// Fermer chaque issue inactive
results.issues.each { issue ->
    transitionIssue(issue, "Close", "Auto-fermée après 30 jours d'inactivité")
}
\`\`\`

## 3. Tempo Timesheets

\`\`\`bash
# API Tempo - Logger du temps
curl -X POST "https://api.tempo.io/4/worklogs" \\
  -H "Authorization: Bearer \\\$TEMPO_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "issueId": 12345,
    "timeSpentSeconds": 7200,
    "startDate": "2024-01-15",
    "startTime": "09:00:00",
    "description": "Développement feature login",
    "authorAccountId": "user-123"
  }'

# Récupérer les timesheets d'une équipe
curl "https://api.tempo.io/4/worklogs?from=2024-01-01&to=2024-01-31&accountId=team-member" \\
  -H "Authorization: Bearer \\\$TEMPO_TOKEN"

# Rapport de facturation
curl "https://api.tempo.io/4/reports/project-budget?projectKey=MYPROJ" \\
  -H "Authorization: Bearer \\\$TEMPO_TOKEN"
\`\`\`

## 4. BigPicture - Planning Portfolio

BigPicture offre une vue Gantt et portfolio multi-projets :

\`\`\`
Fonctionnalités clés :
- Gantt Chart avec dépendances inter-issues
- Resource planning et charge de travail
- Programme Management (multi-projets)
- Risk management intégré
- Roadmap timeline

Configuration :
1. Créer un programme regroupant les projets
2. Définir les dépendances (finish-to-start, etc.)
3. Configurer les ressources et leur capacité
4. Visualiser le chemin critique
5. Détecter les conflits de ressources
\`\`\`

## 5. Xray - Gestion des tests

\`\`\`bash
# API Xray - Créer un test
curl -X POST "https://jira.company.com/rest/raven/2.0/api/test" \\
  -H "Authorization: Bearer \\\$TOKEN" \\
  -d '{
    "fields": {
      "project": {"key": "MYPROJ"},
      "summary": "Vérifier le login avec credentials valides",
      "issuetype": {"name": "Test"},
      "customfield_10200": {
        "type": "manual",
        "steps": [
          {"action": "Naviguer vers /login", "result": "Page de login affichée"},
          {"action": "Entrer des credentials valides", "result": "Formulaire rempli"},
          {"action": "Cliquer sur Submit", "result": "Redirection vers dashboard"}
        ]
      }
    }
  }'

# Importer des résultats de tests automatisés (JUnit)
curl -X POST "https://jira.company.com/rest/raven/2.0/api/import/execution/junit" \\
  -H "Authorization: Bearer \\\$TOKEN" \\
  -F "file=@test-results.xml" \\
  -F "projectKey=MYPROJ"
\`\`\`

## 6. Intégration Slack

\`\`\`bash
# Jira Automation Rule pour Slack
# Trigger: Issue created WHERE type = Bug AND priority = Critical
# Action: Send Slack message
#   Channel: #critical-bugs
#   Message: |
#     :bug: *New Critical Bug*
#     *{{issue.key}}*: {{issue.summary}}
#     Priority: {{issue.priority.name}}
#     Assignee: {{issue.assignee.displayName}}
#     Link: {{issue.url}}
\`\`\``,
    practiceContent: `# Exercices pratiques - Plugins et intégrations

## Exercice 1 : ScriptRunner - Auto-assignation

\`\`\`groovy
// Créez un listener qui assigne automatiquement
// les bugs au lead du composant
import com.atlassian.jira.component.ComponentAccessor

def issue = event.issue
def components = issue.components
if (components && issue.issueType.name == "Bug") {
    def lead = components.first().lead
    if (lead) issue.setAssignee(lead)
}
\`\`\`

## Exercice 2 : Tempo API - Rapport de temps

\`\`\`bash
# Extraire les heures de la semaine
curl "https://api.tempo.io/4/worklogs?from=2024-01-15&to=2024-01-19" \\
  -H "Authorization: Bearer \\\$TEMPO_TOKEN" | \\
  jq '[.results[].timeSpentSeconds] | add / 3600'
\`\`\`

## Exercice 3 : Xray - Import de résultats JUnit

\`\`\`bash
# Après exécution des tests
mvn test
curl -X POST "https://jira.company.com/rest/raven/2.0/api/import/execution/junit" \\
  -F "file=@target/surefire-reports/TEST-results.xml" \\
  -F "projectKey=MYPROJ"
\`\`\`

## Exercice 4 : Automation rule

Créez une règle d'automatisation qui :
1. Se déclenche quand un bug est résolu
2. Ajoute un commentaire de notification
3. Envoie un message Slack au reporter`,
    keyPoints: JSON.stringify(['ScriptRunner permet l\'automatisation avancée de Jira avec des scripts Groovy', 'Tempo Timesheets offre une gestion du temps avec facturation et rapports de capacité', 'BigPicture ajoute la planification portfolio avec Gantt et gestion des dépendances', 'Xray intègre la gestion des tests manuels et automatisés directement dans Jira', 'L\'import de résultats JUnit/TestNG automatise la traçabilité des tests dans le CI/CD', 'Les listeners ScriptRunner réagissent aux événements Jira en temps réel', 'L\'API Tempo v4 permet l\'intégration du time tracking avec les outils externes', 'Les Automation Rules natives de Jira couvrent les cas simples sans plugin additionnel']),
  },


  // ============================================================
  // CONFLUENCE - Module 4: Macros avancées et apps
  // ============================================================
  {
    id: 'conf-04',
    courseId: 'confluence',
    title: 'Macros avancées et apps',
    duration: '3h',
    orderIndex: 4,
    theoryContent: `# Macros Avancées et Apps Confluence

## 1. Introduction

Les macros et apps étendent les capacités de Confluence au-delà de la simple documentation. Des outils de diagrammes (draw.io, Gliffy), de filtrage de données (Table Filter), de formulaires (Scaffolding) et bien d'autres transforment Confluence en plateforme de collaboration avancée.

Ces extensions permettent de :
- Créer des diagrammes techniques interactifs
- Filtrer et trier dynamiquement les données
- Construire des formulaires structurés
- Automatiser la création de contenu

## 2. draw.io (Diagrams for Confluence)

draw.io est l'outil de diagramme le plus populaire sur Confluence :

\`\`\`
Fonctionnalités draw.io :
- Diagrammes d'architecture (AWS, Azure, GCP icons)
- UML (classes, séquences, use cases)
- Flowcharts et processus BPMN
- Network diagrams
- Entity-Relationship diagrams
- Mockups d'interfaces

Configuration recommandée :
- Stockage : Confluence (par défaut) ou Git
- Format : XML compressé dans la page
- Export : PNG, SVG, PDF pour documentation externe
- Collaboration : édition temps réel multi-utilisateurs

Raccourcis utiles :
- Ctrl+Shift+L : verrouiller/déverrouiller les couches
- Ctrl+Shift+H : toggle minimap
- Alt+Shift+P : toggle format panel
\`\`\`

### Diagramme as Code avec PlantUML dans draw.io

\`\`\`
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

Person(user, "Utilisateur", "Accède à l'application web")
System_Boundary(app, "Application") {
    Container(web, "Frontend", "React", "Interface utilisateur")
    Container(api, "API", "Node.js", "Backend REST")
    ContainerDb(db, "Database", "PostgreSQL", "Stockage des données")
}
System_Ext(auth, "Auth Provider", "Keycloak")

Rel(user, web, "HTTPS")
Rel(web, api, "REST/JSON")
Rel(api, db, "SQL")
Rel(api, auth, "OIDC")
@enduml
\`\`\`

## 3. Gliffy

Gliffy est une alternative à draw.io avec une interface plus simple :

\`\`\`
Avantages Gliffy :
- Interface drag-and-drop intuitive
- Templates pré-construits
- Versioning intégré des diagrammes
- Export haute résolution

Types de diagrammes :
- Software architecture
- Network topology
- Wireframes
- Org charts
- Decision trees
\`\`\`

## 4. Table Filter et Charts for Confluence

\`\`\`
Macro Table Filter :
- Filtrage dynamique côté client
- Tri multi-colonnes
- Pagination intégrée
- Export CSV/Excel

Configuration :
{table-filter:id=issues-filter}
|| Clé || Résumé || Priorité || Statut || Assigné ||
| PROJ-1 | Bug login | Haute | En cours | Alice |
| PROJ-2 | Feature export | Moyenne | À faire | Bob |
| PROJ-3 | Fix perf | Haute | En cours | Charlie |
{table-filter}

Options avancées :
- Filtre par défaut sur une colonne
- Masquer certaines colonnes
- Mise en forme conditionnelle
- Calculs sur les colonnes numériques (somme, moyenne)
\`\`\`

### Charts for Confluence

\`\`\`
Macro Chart :
{chart:type=bar|title=Bugs par Sprint|width=600}
|| Sprint || Ouverts || Fermés ||
| Sprint 1 | 12 | 10 |
| Sprint 2 | 8 | 15 |
| Sprint 3 | 5 | 12 |
| Sprint 4 | 3 | 8 |
{chart}

Types de graphiques :
- bar, pie, line, area
- scatter, bubble
- stacked bar, grouped bar
\`\`\`

## 5. Scaffolding (Forms & Templates)

Scaffolding permet de créer des formulaires structurés dans les pages :

\`\`\`
Macro Scaffolding - Formulaire de Change Request :

{form-field:Request Title|type=text|required=true}
{form-field:Priority|type=list|options=Critical,High,Medium,Low}
{form-field:Impact|type=list|options=Service critique,Équipe,Projet}
{form-field:Description|type=textarea|rows=5}
{form-field:Planned Date|type=date}
{form-field:Approver|type=user}
{form-field:Risk Assessment|type=textarea|rows=3}

Automatisations possibles :
- Pré-remplir avec des données Jira
- Déclencher un workflow d'approbation
- Générer automatiquement des pages enfants
- Calculer des valeurs dérivées
\`\`\`

## 6. Autres macros utiles

\`\`\`
Macros de productivité :
- {include} : inclure une page dans une autre
- {excerpt-include} : inclure seulement l'excerpt
- {page-tree} : arborescence des pages enfants
- {recently-updated} : pages modifiées récemment
- {content-by-label} : pages par étiquette
- {roadmap} : timeline visuelle

Macros techniques :
- {code} : blocs de code avec coloration syntaxique
- {noformat} : texte préformaté sans interprétation
- {panel} : encadré avec titre et couleur
- {expand} : section pliable/dépliable
- {status} : badges de statut colorés
- {jira} : embed d'issues Jira
\`\`\``,
    practiceContent: `# Exercices pratiques - Macros avancées

## Exercice 1 : Diagramme d'architecture avec draw.io

Créez un diagramme C4 de votre application :
1. Insérez la macro draw.io
2. Utilisez les formes C4 (Person, Container, System)
3. Ajoutez les relations avec descriptions
4. Exportez en PNG pour le README

## Exercice 2 : Table Filter dynamique

Créez une page avec un tableau filtrable :

\`\`\`
{table-filter:id=services}
|| Service || Environnement || Status || Responsable || Version ||
| API Gateway | Production | UP | Team Backend | 2.3.1 |
| Auth Service | Production | UP | Team Security | 1.8.0 |
| Worker | Staging | DOWN | Team Backend | 3.0.0-rc1 |
{table-filter}
\`\`\`

## Exercice 3 : Formulaire Scaffolding

Créez un template de page "Post-Mortem" avec :
- Champs : Date incident, Sévérité, Impact, Timeline, Root Cause, Actions

## Exercice 4 : Page dynamique avec macros combinées

Combinez plusieurs macros :
- {jira} pour afficher les bugs ouverts
- Chart pour le burndown
- Table Filter pour les actions à faire
- {status} pour les badges de santé`,
    keyPoints: JSON.stringify(['draw.io offre des diagrammes riches (architecture, UML, réseau) directement dans Confluence', 'Table Filter transforme les tableaux statiques en vues filtrables et triables dynamiquement', 'Scaffolding crée des formulaires structurés avec validation et workflows d\'approbation', 'Les macros include et excerpt-include évitent la duplication de contenu entre pages', 'La macro Chart génère des graphiques directement depuis des tableaux Confluence', 'PlantUML dans draw.io permet de créer des diagrammes C4 en tant que code', 'Les macros status et panel améliorent la lisibilité avec des indicateurs visuels', 'La combinaison de macros crée des pages dynamiques qui s\'auto-alimentent']),
  },

  // ============================================================
  // CONFLUENCE - Module 5: Migration et haute disponibilité
  // ============================================================
  {
    id: 'conf-05',
    courseId: 'confluence',
    title: 'Migration et haute disponibilité',
    duration: '3h',
    orderIndex: 5,
    theoryContent: `# Migration et Haute Disponibilité Confluence

## 1. Introduction

La migration et la haute disponibilité de Confluence sont des enjeux critiques pour les organisations qui dépendent de leur base de connaissances. Que ce soit pour migrer de Server vers Data Center ou Cloud, ou pour garantir la continuité de service, une planification rigoureuse est nécessaire.

## 2. Architecture Data Center

\`\`\`
                    ┌──────────────────┐
                    │   Load Balancer  │
                    │   (HAProxy/F5)   │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
    ┌─────────▼───┐  ┌──────▼──────┐  ┌───▼─────────┐
    │ Confluence  │  │ Confluence  │  │ Confluence  │
    │   Node 1    │  │   Node 2    │  │   Node 3    │
    └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
           │                │                │
    ┌──────▼────────────────▼────────────────▼──────┐
    │           Shared File System (NFS/EFS)         │
    │         (attachments, index, plugins)          │
    └───────────────────────┬───────────────────────┘
                            │
    ┌───────────────────────▼───────────────────────┐
    │    PostgreSQL / Oracle (avec réplication)      │
    └───────────────────────────────────────────────┘
\`\`\`

## 3. Configuration du clustering

\`\`\`xml
<!-- confluence.cfg.xml -->
<property name="confluence.cluster">true</property>
<property name="confluence.cluster.home">/shared/confluence</property>
<property name="confluence.cluster.node.name">node-1</property>

<!-- Hazelcast pour la communication inter-noeuds -->
<property name="confluence.cluster.interface">10.0.1.10</property>
<property name="confluence.cluster.join.type">tcp_ip</property>
<property name="confluence.cluster.peers">10.0.1.10,10.0.1.11,10.0.1.12</property>
\`\`\`

\`\`\`bash
# Vérifier le statut du cluster
curl -u admin:password "https://confluence.company.com/rest/api/cluster"

# Réponse attendue
{
  "nodes": [
    {"nodeId": "node-1", "status": "ACTIVE", "uptime": "5d 3h"},
    {"nodeId": "node-2", "status": "ACTIVE", "uptime": "5d 3h"},
    {"nodeId": "node-3", "status": "ACTIVE", "uptime": "2d 1h"}
  ]
}
\`\`\`

## 4. CDN pour les ressources statiques

\`\`\`xml
<!-- confluence.cfg.xml -->
<property name="atl.confluence.cdn.enabled">true</property>
<property name="atl.confluence.cdn.url">https://cdn.company.com/confluence</property>

<!-- Configuration CloudFront/Akamai -->
<!-- Origin: confluence-internal.company.com -->
<!-- Cache: /s/*, /download/resources/*, /images/* -->
<!-- TTL: 1 semaine pour les assets statiques -->
\`\`\`

\`\`\`bash
# Configurer via l'API
curl -X PUT "https://confluence.company.com/rest/api/settings/cdn" \\
  -H "Authorization: Bearer \\\$TOKEN" \\
  -d '{"url": "https://cdn.company.com/confluence", "enabled": true}'
\`\`\`

## 5. Migration Server vers Data Center/Cloud

### Plan de migration

\`\`\`bash
# Phase 1 : Évaluation
# - Auditer les espaces et le contenu
curl "https://confluence.company.com/rest/api/space?limit=100" | jq '.results | length'

# - Inventaire des apps/plugins
curl "https://confluence.company.com/rest/plugins/1.0/" | jq '.plugins | length'

# Phase 2 : Préparation
# - Backup de la base de données
pg_dump -Fc confluence_db > confluence_backup.dump

# - Backup du système de fichiers
tar czf confluence_home_backup.tar.gz /var/atlassian/confluence

# Phase 3 : Migration
# - Server → Data Center : mise à jour de licence + shared FS
# - Server → Cloud : utilisation du Migration Assistant

# Migration Assistant (Server → Cloud)
# Administration > Cloud Migration Assistant
# Étapes :
# 1. Assessment (vérifier la compatibilité)
# 2. User migration
# 3. Space migration (par lots)
# 4. Validation post-migration
\`\`\`

## 6. Upgrade et maintenance

\`\`\`bash
# Procédure d'upgrade Data Center (rolling upgrade)
# 1. Drainer le noeud du load balancer
# 2. Arrêter Confluence sur le noeud
sudo systemctl stop confluence

# 3. Mettre à jour les binaires
tar xzf atlassian-confluence-8.7.0.tar.gz
cp -r atlassian-confluence-8.7.0/* /opt/atlassian/confluence/

# 4. Démarrer et vérifier
sudo systemctl start confluence
curl -s http://localhost:8090/status | jq .state

# 5. Ré-intégrer dans le load balancer
# 6. Répéter pour les autres noeuds

# Vérification post-upgrade
curl "https://confluence.company.com/rest/api/server" \\
  -H "Authorization: Bearer \\\$TOKEN"
# Doit retourner la nouvelle version

# Monitoring de l'upgrade
tail -f /var/atlassian/confluence/logs/atlassian-confluence.log | grep -i "upgrade\\|migration\\|error"
\`\`\`

## 7. Sauvegarde et restauration

\`\`\`bash
# Backup automatisé quotidien
#!/bin/bash
BACKUP_DIR="/backups/confluence/\\\$(date +%Y%m%d)"
mkdir -p \\\$BACKUP_DIR

# Base de données
pg_dump -Fc -h db-server confluence_db > \\\$BACKUP_DIR/db.dump

# Système de fichiers partagé
rsync -az /shared/confluence/ \\\$BACKUP_DIR/shared/

# Configuration
cp /opt/atlassian/confluence/confluence.cfg.xml \\\$BACKUP_DIR/

# Nettoyage des vieux backups (garder 30 jours)
find /backups/confluence -maxdepth 1 -mtime +30 -exec rm -rf {} \\;

# Restauration
pg_restore -h db-server -d confluence_db \\\$BACKUP_DIR/db.dump
rsync -az \\\$BACKUP_DIR/shared/ /shared/confluence/
\`\`\``,
    practiceContent: `# Exercices pratiques - Migration et HA

## Exercice 1 : Configurer un cluster à 2 noeuds

Configurez deux instances Confluence en mode Data Center :
1. Shared filesystem (NFS)
2. Base de données commune
3. Configuration Hazelcast
4. Load balancer (HAProxy)

## Exercice 2 : Configurer le CDN

\`\`\`bash
# Activer le CDN
curl -X PUT "https://confluence/rest/api/settings/cdn" \\
  -d '{"url":"https://cdn.company.com/confluence","enabled":true}'

# Vérifier que les assets sont servis par le CDN
curl -I "https://cdn.company.com/confluence/s/en_GB/8100/xxx/style.css"
\`\`\`

## Exercice 3 : Plan de migration vers le Cloud

Documentez un plan de migration incluant :
1. Inventaire des espaces et apps
2. Mapping des utilisateurs
3. Planning de migration par lots
4. Tests de validation

## Exercice 4 : Procédure de backup/restore

\`\`\`bash
# Testez une restauration complète
# 1. Backup
pg_dump -Fc confluence_db > test_backup.dump

# 2. Créer une instance de test
# 3. Restaurer
pg_restore -d confluence_test test_backup.dump

# 4. Vérifier l'intégrité
curl "http://test-confluence:8090/rest/api/space?limit=5"
\`\`\``,
    keyPoints: JSON.stringify(['L\'architecture Data Center utilise un cluster actif-actif avec stockage partagé', 'Le CDN accélère la distribution des assets statiques et réduit la charge des noeuds', 'La communication inter-noeuds utilise Hazelcast pour la synchronisation du cache', 'Le rolling upgrade permet de mettre à jour sans interruption de service', 'Le Migration Assistant facilite la migration de Server vers Cloud par lots', 'Les backups doivent inclure la base de données ET le filesystem partagé', 'L\'inventaire des apps et leur compatibilité est critique avant toute migration', 'La validation post-migration vérifie l\'intégrité du contenu, des permissions et des macros']),
  },


  // ============================================================
  // BITBUCKET - Module 4: Code Insights et qualité
  // ============================================================
  {
    id: 'bb-04',
    courseId: 'bitbucket',
    title: 'Code Insights et qualité',
    duration: '3h',
    orderIndex: 4,
    theoryContent: `# Code Insights et Qualité dans Bitbucket

## 1. Introduction

**Code Insights** est une fonctionnalité de Bitbucket Data Center qui affiche les résultats d'analyse de code directement dans les pull requests. Les outils de qualité (couverture, SAST, linting) publient leurs résultats via l'API, offrant un feedback immédiat aux développeurs et aux reviewers.

Code Insights affiche :
- Les rapports de couverture de code
- Les annotations sur les lignes de code (bugs, vulnérabilités)
- Le statut des builds (succès/échec)
- Les métriques de qualité personnalisées

## 2. API Code Insights

### Publier un rapport

\`\`\`bash
# Créer un rapport d'analyse
curl -X PUT "https://bitbucket.company.com/rest/insights/1.0/projects/PROJ/repos/myrepo/commits/\\\${COMMIT}/reports/security-scan" \\
  -H "Authorization: Bearer \\\$TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Security Scan",
    "reporter": "SAST Scanner",
    "logoUrl": "https://scanner.com/logo.png",
    "result": "FAIL",
    "details": "3 vulnérabilités trouvées (1 critique, 2 hautes)",
    "data": [
      {"title": "Critical Issues", "type": "NUMBER", "value": 1},
      {"title": "High Issues", "type": "NUMBER", "value": 2},
      {"title": "Coverage", "type": "PERCENTAGE", "value": 82.5},
      {"title": "Scan Duration", "type": "DURATION", "value": 45000}
    ]
  }'
\`\`\`

### Publier des annotations

\`\`\`bash
# Ajouter des annotations (problèmes sur des lignes spécifiques)
curl -X POST "https://bitbucket.company.com/rest/insights/1.0/projects/PROJ/repos/myrepo/commits/\\\${COMMIT}/reports/security-scan/annotations" \\
  -H "Authorization: Bearer \\\$TOKEN" \\
  -d '{
    "annotations": [
      {
        "path": "src/auth/login.js",
        "line": 42,
        "message": "SQL Injection vulnerability: user input not sanitized",
        "severity": "HIGH",
        "type": "VULNERABILITY",
        "link": "https://cwe.mitre.org/data/definitions/89.html",
        "externalId": "CWE-89"
      },
      {
        "path": "src/api/users.js",
        "line": 18,
        "message": "Hardcoded credentials detected",
        "severity": "CRITICAL",
        "type": "VULNERABILITY"
      },
      {
        "path": "src/utils/crypto.js",
        "line": 7,
        "message": "Weak cryptographic algorithm (MD5)",
        "severity": "HIGH",
        "type": "CODE_SMELL"
      }
    ]
  }'
\`\`\`

## 3. Couverture de code

\`\`\`bash
# Publier la couverture de code
# Format attendu : mapping fichier → pourcentage
curl -X PUT "https://bitbucket.company.com/rest/code-coverage/1.0/commits/\\\${COMMIT}" \\
  -H "Authorization: Bearer \\\$TOKEN" \\
  -d '{
    "files": [
      {"path": "src/auth/login.js", "coverage": "C:1-5,10-20;U:6-9;P:21-25"},
      {"path": "src/api/users.js", "coverage": "C:1-50;U:51-60"},
      {"path": "src/utils/helpers.js", "coverage": "C:1-100"}
    ]
  }'

# C = Covered, U = Uncovered, P = Partial

# Script d'intégration avec Istanbul/NYC
#!/bin/bash
npm test -- --coverage
# Parser le rapport lcov
node scripts/parse-coverage.js coverage/lcov.info | \\
  curl -X PUT "https://bitbucket.company.com/rest/code-coverage/1.0/commits/\\\$COMMIT" \\
  -H "Authorization: Bearer \\\$TOKEN" \\
  -d @-
\`\`\`

## 4. Build Status

\`\`\`bash
# Publier le statut du build
curl -X POST "https://bitbucket.company.com/rest/build-status/1.0/commits/\\\${COMMIT}" \\
  -H "Authorization: Bearer \\\$TOKEN" \\
  -d '{
    "state": "SUCCESSFUL",
    "key": "build-linux",
    "name": "Linux Build #142",
    "url": "https://jenkins.company.com/job/myapp/142",
    "description": "Build successful in 3m 22s"
  }'

# États possibles : INPROGRESS, SUCCESSFUL, FAILED

# Multiple build status (matrix)
for platform in linux macos windows; do
  curl -X POST "https://bitbucket.company.com/rest/build-status/1.0/commits/\\\${COMMIT}" \\
    -d "{
      \\"state\\": \\"SUCCESSFUL\\",
      \\"key\\": \\"build-\\\$platform\\",
      \\"name\\": \\"Build \\\$platform\\",
      \\"url\\": \\"https://jenkins.company.com/job/myapp-\\\$platform/\\\$BUILD_NUMBER\\"
    }"
done
\`\`\`

## 5. Merge Checks basés sur Code Insights

\`\`\`bash
# Configurer un merge check basé sur les rapports
# Administration > Repository > Merge Checks

# Merge checks disponibles :
# - Minimum approvals (nombre de reviewers)
# - Successful builds (au moins N builds verts)
# - No unresolved tasks
# - All code-insights reports must pass
# - Minimum code coverage (seuil %)

# API pour configurer les merge checks
curl -X PUT "https://bitbucket.company.com/rest/api/1.0/projects/PROJ/repos/myrepo/settings/merge-checks" \\
  -H "Authorization: Bearer \\\$TOKEN" \\
  -d '{
    "checks": [
      {"type": "MIN_APPROVALS", "value": 2},
      {"type": "SUCCESSFUL_BUILDS", "value": 1},
      {"type": "CODE_INSIGHTS_PASS", "value": true},
      {"type": "NO_UNRESOLVED_TASKS", "value": true}
    ]
  }'
\`\`\`

## 6. Intégration SAST dans les pipelines

\`\`\`yaml
# bitbucket-pipelines.yml avec Code Insights
image: node:18

pipelines:
  pull-requests:
    '**':
      - step:
          name: Build & Test
          script:
            - npm ci
            - npm test -- --coverage
            - node scripts/publish-coverage.js
          after-script:
            - pipe: atlassian/bitbucket-upload-file:0.3.3

      - step:
          name: Security Scan
          script:
            - npm audit --json > audit.json || true
            - npx semgrep --config=p/javascript --json > semgrep.json || true
            - node scripts/publish-insights.js audit.json semgrep.json
\`\`\``,
    practiceContent: `# Exercices pratiques - Code Insights et qualité

## Exercice 1 : Publier un rapport Code Insights

\`\`\`bash
# Après vos analyses, publiez les résultats
COMMIT=\\\$(git rev-parse HEAD)
curl -X PUT "https://bitbucket/rest/insights/1.0/projects/PROJ/repos/myrepo/commits/\\\$COMMIT/reports/lint" \\
  -d '{
    "title": "ESLint Results",
    "result": "PASS",
    "data": [{"title":"Warnings","type":"NUMBER","value":5}]
  }'
\`\`\`

## Exercice 2 : Annotations sur les lignes

Publiez des annotations de lint sur les fichiers modifiés d'une PR.

## Exercice 3 : Couverture de code

\`\`\`bash
# Générer et publier la couverture
npm test -- --coverage
# Parser et publier via l'API code-coverage
\`\`\`

## Exercice 4 : Merge checks complets

Configurez des merge checks qui exigent :
- 2 approbations minimum
- Build vert
- Tous les rapports Code Insights passent
- Couverture >= 80%`,
    keyPoints: JSON.stringify(['Code Insights affiche les résultats d\'analyse directement dans les pull requests', 'Les annotations marquent les problèmes sur les lignes de code spécifiques', 'L\'API code-coverage affiche la couverture ligne par ligne dans le diff', 'Les merge checks bloquent le merge si les critères de qualité ne sont pas remplis', 'Le build status agrège les résultats de multiples pipelines (matrix builds)', 'Les rapports peuvent contenir des métriques de type NUMBER, PERCENTAGE, DURATION, TEXT', 'L\'intégration SAST publie les vulnérabilités comme annotations dans la PR', 'Les scripts post-build automatisent la publication des résultats via l\'API REST']),
  },

  // ============================================================
  // BITBUCKET - Module 5: Mirroring et performance
  // ============================================================
  {
    id: 'bb-05',
    courseId: 'bitbucket',
    title: 'Mirroring et performance',
    duration: '3h',
    orderIndex: 5,
    theoryContent: `# Mirroring et Performance Bitbucket

## 1. Introduction

Pour les organisations géographiquement distribuées ou avec de grands dépôts, Bitbucket Data Center offre des solutions de performance : **Smart Mirroring** pour réduire la latence des clones, **Git LFS** pour les fichiers volumineux, et **Mesh** pour le scaling horizontal du stockage Git.

## 2. Smart Mirroring

Le Smart Mirroring crée des copies en lecture seule des dépôts sur des sites distants :

\`\`\`
Architecture Smart Mirroring :
                                          
  Site Paris (Primary)        Site New York (Mirror)     Site Tokyo (Mirror)
  ┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
  │   Bitbucket DC   │──────>│  Bitbucket Mirror│──────>│  Bitbucket Mirror│
  │   (read/write)   │ sync  │  (read-only)     │ sync  │  (read-only)     │
  └──────────────────┘       └──────────────────┘       └──────────────────┘
         ↕                          ↕                          ↕
    Devs Paris                 Devs New York               Devs Tokyo
    (clone/push/pull)          (clone/pull fast)           (clone/pull fast)
                               (push → redirect            (push → redirect
                                to primary)                  to primary)
\`\`\`

\`\`\`bash
# Configurer un mirror
# 1. Installer Bitbucket Mirror sur le site distant
# 2. Générer un token d'authentification

# Sur le primary : configurer le mirror
curl -X POST "https://bitbucket-primary.company.com/rest/mirroring/1.0/mirrors" \\
  -H "Authorization: Bearer \\\$TOKEN" \\
  -d '{
    "name": "New York Mirror",
    "baseUrl": "https://bitbucket-ny.company.com",
    "enabled": true,
    "productVersion": "8.7.0"
  }'

# Configurer les repos à mirrorer
curl -X POST "https://bitbucket-primary.company.com/rest/mirroring/1.0/mirrors/\\\$MIRROR_ID/repos" \\
  -d '{
    "repoId": 123,
    "projectKey": "PROJ",
    "repoSlug": "myrepo"
  }'

# Clone depuis le mirror (automatique avec upstream URL)
git clone --mirror-url https://bitbucket-ny.company.com https://bitbucket-primary.company.com/scm/PROJ/myrepo.git
\`\`\`

## 3. Git LFS (Large File Storage)

\`\`\`bash
# Activer LFS sur un repository
# Administration > Repository Settings > Git LFS > Enable

# Configuration côté client
git lfs install

# Tracker les fichiers volumineux
git lfs track "*.psd"
git lfs track "*.zip"
git lfs track "*.bin"
git lfs track "models/**"
git lfs track "assets/videos/**"

# Vérifier la configuration
cat .gitattributes
# *.psd filter=lfs diff=lfs merge=lfs -text
# *.zip filter=lfs diff=lfs merge=lfs -text

# Migrer les fichiers existants vers LFS
git lfs migrate import --include="*.psd,*.zip" --everything

# Statistiques LFS
git lfs ls-files
git lfs env
\`\`\`

\`\`\`bash
# Configuration serveur pour LFS
# Administration > Git LFS
# - Max file size: 500MB
# - Storage: /data/lfs ou S3
# - Quota par projet: 50GB

# API pour vérifier l'utilisation LFS
curl "https://bitbucket.company.com/rest/api/1.0/projects/PROJ/repos/myrepo/lfs/stats" \\
  -H "Authorization: Bearer \\\$TOKEN"
\`\`\`

## 4. Bitbucket Mesh (Data Center 8.x+)

Mesh distribue le stockage Git sur plusieurs noeuds :

\`\`\`
Architecture Mesh :
┌──────────────────────────────────────────────┐
│            Bitbucket Application Nodes        │
│         (API, UI, CI webhooks)               │
└─────────────┬────────────────────────────────┘
              │
┌─────────────▼────────────────────────────────┐
│            Mesh Nodes (Git Storage)           │
├──────────────┬──────────────┬────────────────┤
│  Mesh Node 1 │  Mesh Node 2 │  Mesh Node 3  │
│  repos A-M   │  repos N-Z   │  repos (répl) │
└──────────────┴──────────────┴────────────────┘
\`\`\`

\`\`\`bash
# Configurer un noeud Mesh
# bitbucket-mesh.properties
mesh.node.id=mesh-node-1
mesh.storage.directory=/data/mesh/repos
mesh.http.port=7777
mesh.grpc.port=7778

# Ajouter un noeud Mesh au cluster
curl -X POST "https://bitbucket.company.com/rest/api/1.0/admin/mesh/nodes" \\
  -H "Authorization: Bearer \\\$TOKEN" \\
  -d '{
    "name": "mesh-node-1",
    "url": "http://mesh-01.company.com:7777"
  }'

# Migrer un repo vers Mesh
curl -X POST "https://bitbucket.company.com/rest/api/1.0/admin/mesh/migration" \\
  -d '{"projectKey": "PROJ", "repoSlug": "large-repo"}'
\`\`\`

## 5. Optimisation des performances

\`\`\`bash
# Tuning JVM pour Bitbucket
# setenv.sh
JVM_MINIMUM_MEMORY="2048m"
JVM_MAXIMUM_MEMORY="4096m"
JVM_SUPPORT_RECOMMENDED_ARGS="-XX:+UseG1GC -XX:MaxGCPauseMillis=200"

# Git garbage collection
# Administration > Maintenance > Git GC
# Schedule: Weekly
# Ou via API :
curl -X POST "https://bitbucket.company.com/rest/api/1.0/projects/PROJ/repos/myrepo/maintenance" \\
  -d '{"type": "gc"}'

# Repository limits et alertes
# - Max repo size: warning à 2GB, hard limit à 5GB
# - Max file size: 100MB (sans LFS)
# - Max push size: 500MB

# Monitoring des performances
curl "https://bitbucket.company.com/rest/api/1.0/admin/metrics" \\
  -H "Authorization: Bearer \\\$TOKEN"
# Métriques : clone time, push time, PR merge time, hosting requests/sec
\`\`\`

## 6. Rate limiting et protection

\`\`\`bash
# Configurer le rate limiting
# Administration > Rate Limiting
# - Anonymous: 30 req/min
# - Authenticated: 300 req/min
# - CI/CD service accounts: 1000 req/min

# Configuration avancée
# bitbucket.properties
rate.limiting.enabled=true
rate.limiting.anonymous.capacity=30
rate.limiting.authenticated.capacity=300
rate.limiting.special.capacity=1000
rate.limiting.special.users=jenkins-bot,gitlab-mirror
\`\`\``,
    practiceContent: `# Exercices pratiques - Mirroring et performance

## Exercice 1 : Configurer Git LFS

\`\`\`bash
# Initialiser LFS dans un repo
git lfs install
git lfs track "*.bin" "*.zip" "*.tar.gz"
git add .gitattributes
git commit -m "Configure Git LFS"

# Ajouter un fichier volumineux
dd if=/dev/urandom of=test.bin bs=1M count=50
git add test.bin
git commit -m "Add large binary"
git push
\`\`\`

## Exercice 2 : Configurer le Smart Mirroring

Documentez la configuration d'un mirror pour un site distant.

## Exercice 3 : Optimiser un grand dépôt

\`\`\`bash
# Analyser la taille du repo
git count-objects -v -H
git rev-list --objects --all | git cat-file --batch-check | sort -k3 -n -r | head -20

# Lancer le GC
curl -X POST "https://bitbucket/rest/api/1.0/projects/PROJ/repos/big-repo/maintenance" \\
  -d '{"type":"gc"}'
\`\`\`

## Exercice 4 : Monitoring des performances

Configurez des alertes sur :
- Clone time > 30s
- Push time > 10s
- Taille du repo > 2GB`,
    keyPoints: JSON.stringify(['Le Smart Mirroring crée des copies en lecture seule sur les sites distants pour réduire la latence', 'Les pushes depuis un mirror sont redirigés automatiquement vers le serveur primary', 'Git LFS stocke les fichiers volumineux séparément pour garder le dépôt Git léger', 'Bitbucket Mesh distribue le stockage Git sur plusieurs noeuds pour le scaling horizontal', 'Le Git Garbage Collection régulier maintient les performances des grands dépôts', 'Le rate limiting protège le serveur contre les abus et les scripts non optimisés', 'Les repository limits alertent les équipes avant qu\'un dépôt ne devienne trop volumineux', 'Le tuning JVM avec G1GC et des paramètres mémoire adaptés améliore la réactivité']),
  },


  // ============================================================
  // DOCKER - Module 4: Sécurité Docker
  // ============================================================
  {
    id: 'docker-04',
    courseId: 'docker',
    title: 'Sécurité Docker',
    duration: '3h',
    orderIndex: 4,
    theoryContent: `# Sécurité Docker

## 1. Introduction

La sécurité Docker est un enjeu majeur en production. Les conteneurs partagent le noyau de l'hôte, ce qui nécessite des mesures de durcissement : mode rootless, profils de sécurité (seccomp, AppArmor), signature d'images, scanning de vulnérabilités et gestion des secrets.

Les principes de sécurité Docker :
- Principe du moindre privilège
- Défense en profondeur
- Images minimales et vérifiées
- Secrets jamais dans les images
- Scanning continu des vulnérabilités

## 2. Mode Rootless

Le mode rootless exécute le démon Docker sans privilèges root :

\`\`\`bash
# Installation rootless
dockerd-rootless-setuptool.sh install

# Vérifier le mode
docker info | grep -i "root"
# Context: rootless
# Security Options: rootless

# Configuration pour rootless
export DOCKER_HOST=unix:///run/user/1000/docker.sock

# Limitations du mode rootless :
# - Pas de port < 1024 sans configuration spéciale
# - Certains storage drivers non supportés
# - Network overlay limité

# Permettre les ports bas
sudo sysctl net.ipv4.ip_unprivileged_port_start=80
\`\`\`

## 3. Profils de sécurité

### Seccomp (Secure Computing)

\`\`\`json
{
  "defaultAction": "SCMP_ACT_ERRNO",
  "architectures": ["SCMP_ARCH_X86_64"],
  "syscalls": [
    {
      "names": ["accept", "bind", "clone", "close", "connect",
                "execve", "exit", "read", "write", "openat",
                "mmap", "stat", "fstat"],
      "action": "SCMP_ACT_ALLOW"
    },
    {
      "names": ["mount", "umount2", "ptrace", "kexec_load"],
      "action": "SCMP_ACT_ERRNO",
      "comment": "Dangerous syscalls blocked"
    }
  ]
}
\`\`\`

\`\`\`bash
# Appliquer un profil seccomp personnalisé
docker run --security-opt seccomp=custom-profile.json myimage

# Désactiver seccomp (déconseillé)
docker run --security-opt seccomp=unconfined myimage

# Vérifier le profil par défaut
docker info --format '{{ .SecurityOptions }}'
\`\`\`

### AppArmor

\`\`\`bash
# Profil AppArmor pour Docker
# /etc/apparmor.d/docker-custom
profile docker-custom flags=(attach_disconnected,mediate_deleted) {
  #include <abstractions/base>

  # Réseau
  network inet tcp,
  network inet udp,

  # Filesystem
  /app/** r,
  /tmp/** rw,
  /var/log/** w,

  # Deny dangerous operations
  deny /etc/shadow r,
  deny /proc/*/mem rw,
  deny mount,
}

# Charger le profil
sudo apparmor_parser -r /etc/apparmor.d/docker-custom

# Utiliser le profil
docker run --security-opt apparmor=docker-custom myimage
\`\`\`

## 4. Signing et vérification d'images

\`\`\`bash
# Docker Content Trust (Notary)
export DOCKER_CONTENT_TRUST=1

# Signer une image lors du push
docker push registry.company.com/myapp:1.0.0
# Demande automatiquement la passphrase de la clé

# Vérifier la signature
docker trust inspect registry.company.com/myapp:1.0.0

# Cosign (Sigstore) - alternative moderne
cosign generate-key-pair

# Signer
cosign sign --key cosign.key registry.company.com/myapp:1.0.0

# Vérifier
cosign verify --key cosign.pub registry.company.com/myapp:1.0.0

# Policy d'admission Kubernetes (Kyverno)
# Rejeter les images non signées
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: verify-image-signatures
spec:
  validationFailureAction: enforce
  rules:
    - name: verify-signature
      match:
        resources:
          kinds: [Pod]
      verifyImages:
        - imageReferences: ["registry.company.com/*"]
          attestors:
            - entries:
                - keys:
                    publicKeys: |-
                      -----BEGIN PUBLIC KEY-----
                      ...
                      -----END PUBLIC KEY-----
\`\`\`

## 5. Scanning de vulnérabilités

\`\`\`bash
# Trivy - scanner open source
trivy image registry.company.com/myapp:1.0.0

# Scanner avec seuil de sévérité
trivy image --severity HIGH,CRITICAL --exit-code 1 myapp:latest

# Scanner le Dockerfile
trivy config --severity HIGH Dockerfile

# Grype - alternative
grype registry.company.com/myapp:1.0.0

# Docker Scout (intégré Docker Desktop)
docker scout quickview myapp:latest
docker scout cves myapp:latest --only-severity critical,high
docker scout recommendations myapp:latest
\`\`\`

## 6. Gestion des secrets

\`\`\`bash
# Docker Secrets (Swarm mode)
echo "db_password_123" | docker secret create db_password -
docker service create --secret db_password myapp
# Le secret est monté dans /run/secrets/db_password

# BuildKit secrets (ne pas mettre dans l'image)
# Dockerfile
RUN --mount=type=secret,id=npm_token \\
    NPM_TOKEN=\\\$(cat /run/secrets/npm_token) npm install

# Build avec le secret
docker build --secret id=npm_token,src=.npmrc .

# Multi-stage pour ne pas leaker les secrets
FROM node:18 AS build
COPY package*.json ./
RUN --mount=type=secret,id=npm_token \\
    NPM_TOKEN=\\\$(cat /run/secrets/npm_token) npm ci
COPY . .
RUN npm run build

FROM node:18-slim AS production
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
USER node
CMD ["node", "dist/server.js"]
\`\`\`

## 7. Bonnes pratiques de sécurité Dockerfile

\`\`\`dockerfile
# Image minimale
FROM node:18-alpine AS base

# Utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Pas de COPY de fichiers sensibles
COPY --chown=appuser:appgroup package*.json ./

# Health check
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Read-only filesystem
# docker run --read-only --tmpfs /tmp myapp
\`\`\``,
    practiceContent: `# Exercices pratiques - Sécurité Docker

## Exercice 1 : Scanner une image

\`\`\`bash
# Installer et utiliser Trivy
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \\
  aquasec/trivy image node:18

# Scanner votre image avec seuil
trivy image --severity CRITICAL --exit-code 1 myapp:latest
\`\`\`

## Exercice 2 : Dockerfile sécurisé

Réécrivez ce Dockerfile non sécurisé :

\`\`\`dockerfile
FROM node:18
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

En version sécurisée (multi-stage, non-root, sans secrets).

## Exercice 3 : Secrets avec BuildKit

\`\`\`bash
# Build avec secret
echo "registry-token" > .secret
DOCKER_BUILDKIT=1 docker build --secret id=mytoken,src=.secret .
rm .secret
\`\`\`

## Exercice 4 : Profil seccomp custom

Créez un profil seccomp restrictif pour votre application et testez-le.`,
    keyPoints: JSON.stringify(['Le mode rootless exécute Docker sans privilèges root pour réduire la surface d\'attaque', 'Seccomp filtre les appels système autorisés pour limiter les actions du conteneur', 'AppArmor restreint l\'accès au filesystem et aux capacités réseau', 'Docker Content Trust et Cosign garantissent l\'authenticité des images par signature', 'Trivy et Grype scannent les images pour détecter les CVE connues', 'Les secrets BuildKit ne sont jamais écrits dans les couches de l\'image finale', 'L\'utilisateur non-root dans le Dockerfile applique le principe du moindre privilège', 'Le filesystem en lecture seule (--read-only) empêche les modifications runtime']),
  },

  // ============================================================
  // DOCKER - Module 5: Docker en production
  // ============================================================
  {
    id: 'docker-05',
    courseId: 'docker',
    title: 'Docker en production',
    duration: '3h',
    orderIndex: 5,
    theoryContent: `# Docker en Production

## 1. Introduction

Exécuter Docker en production nécessite une attention particulière au logging, au monitoring, à l'orchestration et aux bonnes pratiques opérationnelles. Ce module couvre les aspects pratiques pour maintenir des conteneurs fiables et observables en environnement de production.

## 2. Logging

\`\`\`bash
# Drivers de logging disponibles
docker info --format '{{.LoggingDriver}}'
# json-file, syslog, journald, fluentd, splunk, awslogs

# Configuration du driver json-file avec rotation
docker run -d --log-driver json-file \\
  --log-opt max-size=50m \\
  --log-opt max-file=5 \\
  --log-opt compress=true \\
  myapp:latest

# Configuration globale dans daemon.json
cat /etc/docker/daemon.json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "50m",
    "max-file": "5",
    "labels": "service,environment"
  }
}

# Fluentd pour centralisation
docker run -d --log-driver=fluentd \\
  --log-opt fluentd-address=fluentd:24224 \\
  --log-opt tag="docker.{{.Name}}" \\
  --log-opt labels=service,version \\
  --label service=api \\
  --label version=2.1.0 \\
  myapp:latest

# Structurer les logs dans l'application (JSON)
# {"timestamp":"2024-01-15T10:30:00Z","level":"error","service":"api","message":"DB connection failed","trace_id":"abc123"}
\`\`\`

## 3. Monitoring

\`\`\`bash
# cAdvisor - métriques des conteneurs
docker run -d --name cadvisor \\
  --volume=/:/rootfs:ro \\
  --volume=/var/run:/var/run:ro \\
  --volume=/sys:/sys:ro \\
  --volume=/var/lib/docker/:/var/lib/docker:ro \\
  -p 8080:8080 \\
  gcr.io/cadvisor/cadvisor:latest

# Docker stats natif
docker stats --format "table {{.Name}}\\t{{.CPUPerc}}\\t{{.MemUsage}}\\t{{.NetIO}}"

# Prometheus avec Docker
# prometheus.yml
scrape_configs:
  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']
  - job_name: 'docker'
    static_configs:
      - targets: ['host.docker.internal:9323']

# Activer les métriques Docker pour Prometheus
# daemon.json
{
  "metrics-addr": "0.0.0.0:9323",
  "experimental": true
}

# Health checks dans docker-compose
services:
  api:
    image: myapp:latest
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 40s
\`\`\`

## 4. Orchestration avec Docker Compose en production

\`\`\`yaml
# docker-compose.prod.yml
version: '3.8'

services:
  api:
    image: registry.company.com/api:\\\${VERSION:-latest}
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 128M
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
        window: 120s
      update_config:
        parallelism: 1
        delay: 30s
        failure_action: rollback
        order: start-first
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:3000/health"]
      interval: 30s
      timeout: 5s
      retries: 3
    logging:
      driver: json-file
      options:
        max-size: "50m"
        max-file: "3"
    networks:
      - frontend
      - backend

  db:
    image: postgres:16-alpine
    volumes:
      - db_data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    secrets:
      - db_password
    deploy:
      placement:
        constraints:
          - node.labels.storage == ssd

volumes:
  db_data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /data/postgres

secrets:
  db_password:
    external: true

networks:
  frontend:
  backend:
    internal: true
\`\`\`

## 5. Bonnes pratiques de production

\`\`\`bash
# 1. Toujours utiliser des tags spécifiques (jamais :latest)
docker pull myapp:2.1.0-alpine

# 2. Limiter les ressources
docker run -d --memory=512m --cpus=1.0 --pids-limit=100 myapp:2.1.0

# 3. Restart policy
docker run -d --restart=on-failure:5 myapp:2.1.0

# 4. Read-only root filesystem
docker run -d --read-only --tmpfs /tmp --tmpfs /var/cache myapp:2.1.0

# 5. Drop des capabilities Linux
docker run -d --cap-drop=ALL --cap-add=NET_BIND_SERVICE myapp:2.1.0

# 6. Réseau isolé
docker network create --internal backend-net
docker run -d --network=backend-net myapp:2.1.0

# 7. Labels pour l'organisation
docker run -d \\
  --label com.company.service=api \\
  --label com.company.team=backend \\
  --label com.company.version=2.1.0 \\
  myapp:2.1.0

# 8. Graceful shutdown
# Dans le Dockerfile : STOPSIGNAL SIGTERM
# docker stop --time=30 container_name
\`\`\`

## 6. Mise à jour sans downtime

\`\`\`bash
# Blue-Green avec Docker Compose
# 1. Démarrer la nouvelle version
docker compose -f docker-compose.prod.yml up -d --scale api=3 --no-recreate

# 2. Vérifier la santé
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml exec api curl localhost:3000/health

# 3. Basculer le load balancer

# Rolling update avec Compose
docker compose -f docker-compose.prod.yml up -d --force-recreate --no-deps api
\`\`\``,
    practiceContent: `# Exercices pratiques - Docker en production

## Exercice 1 : Logging centralisé

\`\`\`yaml
# docker-compose.yml avec Fluentd
services:
  app:
    image: myapp:latest
    logging:
      driver: fluentd
      options:
        fluentd-address: "localhost:24224"
        tag: "app.{{.Name}}"
  fluentd:
    image: fluent/fluentd:v1.16
    ports:
      - "24224:24224"
\`\`\`

## Exercice 2 : Monitoring avec cAdvisor + Prometheus

\`\`\`bash
docker run -d --name cadvisor -p 8080:8080 \\
  -v /:/rootfs:ro -v /var/run:/var/run:ro \\
  -v /sys:/sys:ro -v /var/lib/docker/:/var/lib/docker:ro \\
  gcr.io/cadvisor/cadvisor

# Vérifiez les métriques
curl http://localhost:8080/metrics | grep container_cpu
\`\`\`

## Exercice 3 : Compose de production sécurisé

Créez un docker-compose.prod.yml avec :
- Limites de ressources
- Health checks
- Logging avec rotation
- Secrets
- Restart policy

## Exercice 4 : Rolling update

\`\`\`bash
# Simuler un update sans downtime
docker compose up -d --scale api=2
# Mettre à jour la version
VERSION=2.2.0 docker compose up -d --no-deps api
\`\`\``,
    keyPoints: JSON.stringify(['Le driver de logging json-file avec rotation évite de remplir le disque en production', 'cAdvisor et les métriques Docker exposent la consommation CPU, mémoire et réseau des conteneurs', 'Les health checks permettent la détection automatique des conteneurs défaillants', 'Les limites de ressources (memory, cpus, pids-limit) protègent l\'hôte contre les fuites', 'Le mode read-only avec tmpfs empêche les modifications non autorisées du filesystem', 'Le drop de capabilities Linux applique le principe du moindre privilège au runtime', 'La restart policy on-failure avec limite d\'essais évite les boucles de redémarrage', 'Le graceful shutdown avec STOPSIGNAL SIGTERM permet une terminaison propre des connexions']),
  },


  // ============================================================
  // KUBERNETES - Module 4: Sécurité Kubernetes
  // ============================================================
  {
    id: 'k8s-04',
    courseId: 'kubernetes',
    title: 'Sécurité Kubernetes',
    duration: '4h',
    orderIndex: 4,
    theoryContent: `# Sécurité Kubernetes

## 1. Introduction

La sécurité Kubernetes est un domaine vaste qui couvre le contrôle d'accès (RBAC), l'isolation réseau (NetworkPolicies), les standards de sécurité des pods (PodSecurityStandards), les politiques d'admission (OPA/Gatekeeper) et la détection d'intrusion runtime (Falco).

Les 4 couches de sécurité Kubernetes :
- **Cluster** : RBAC, audit, chiffrement etcd
- **Réseau** : NetworkPolicies, mTLS (service mesh)
- **Pod** : SecurityContext, PodSecurityStandards
- **Container** : images signées, scanning, runtime security

## 2. RBAC (Role-Based Access Control)

\`\`\`yaml
# Role limité à un namespace
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: production
  name: developer-role
rules:
  - apiGroups: ["apps"]
    resources: ["deployments"]
    verbs: ["get", "list", "watch", "update", "patch"]
  - apiGroups: [""]
    resources: ["pods", "pods/log", "services", "configmaps"]
    verbs: ["get", "list", "watch"]
  - apiGroups: [""]
    resources: ["pods/exec"]
    verbs: []  # Pas d'exec en production

---
# RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: developer-binding
  namespace: production
subjects:
  - kind: Group
    name: developers
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: developer-role
  apiGroup: rbac.authorization.k8s.io

---
# ClusterRole pour les opérations cross-namespace
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: namespace-viewer
rules:
  - apiGroups: [""]
    resources: ["namespaces"]
    verbs: ["get", "list", "watch"]
  - apiGroups: ["metrics.k8s.io"]
    resources: ["pods", "nodes"]
    verbs: ["get", "list"]
\`\`\`

## 3. NetworkPolicies

\`\`\`yaml
# Deny all par défaut
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: production
spec:
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress

---
# Autoriser le trafic spécifique
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-network-policy
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: api
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: frontend
        - namespaceSelector:
            matchLabels:
              name: ingress-nginx
      ports:
        - protocol: TCP
          port: 8080
  egress:
    - to:
        - podSelector:
            matchLabels:
              app: postgres
      ports:
        - protocol: TCP
          port: 5432
    - to:  # Autoriser DNS
        - namespaceSelector: {}
          podSelector:
            matchLabels:
              k8s-app: kube-dns
      ports:
        - protocol: UDP
          port: 53
\`\`\`

## 4. Pod Security Standards

\`\`\`yaml
# Namespace avec enforcement Restricted
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted

---
# Pod conforme au standard Restricted
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    runAsGroup: 1000
    fsGroup: 1000
    seccompProfile:
      type: RuntimeDefault
  containers:
    - name: app
      image: myapp:1.0.0
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        capabilities:
          drop: ["ALL"]
      resources:
        limits:
          memory: "256Mi"
          cpu: "500m"
        requests:
          memory: "128Mi"
          cpu: "100m"
      volumeMounts:
        - name: tmp
          mountPath: /tmp
  volumes:
    - name: tmp
      emptyDir: {}
\`\`\`

## 5. OPA Gatekeeper

\`\`\`yaml
# Contrainte : pas de conteneurs privilégiés
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8sdisallowprivileged
spec:
  crd:
    spec:
      names:
        kind: K8sDisallowPrivileged
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package k8sdisallowprivileged
        violation[{"msg": msg}] {
          container := input.review.object.spec.containers[_]
          container.securityContext.privileged == true
          msg := sprintf("Container %v is not allowed to run as privileged", [container.name])
        }

---
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sDisallowPrivileged
metadata:
  name: no-privileged-containers
spec:
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]
    namespaces: ["production", "staging"]
\`\`\`

## 6. Falco - Runtime Security

\`\`\`yaml
# falco_rules.yaml
- rule: Terminal shell in container
  desc: Detect a shell spawned in a container
  condition: >
    spawned_process and container and
    proc.name in (bash, sh, zsh) and
    not proc.pname in (cron, supervisord)
  output: >
    Shell spawned in container
    (user=%user.name container=%container.name shell=%proc.name
     parent=%proc.pname cmdline=%proc.cmdline)
  priority: WARNING
  tags: [container, shell, mitre_execution]

- rule: Read sensitive file in container
  desc: Detect reading of sensitive files
  condition: >
    open_read and container and
    fd.name in (/etc/shadow, /etc/passwd, /proc/1/environ)
  output: >
    Sensitive file read in container
    (file=%fd.name container=%container.name user=%user.name)
  priority: CRITICAL
  tags: [container, filesystem]
\`\`\``,
    practiceContent: `# Exercices pratiques - Sécurité Kubernetes

## Exercice 1 : RBAC restrictif

\`\`\`yaml
# Créez un Role qui permet uniquement de lire les pods et logs
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: dev
  name: pod-reader
rules:
  - apiGroups: [""]
    resources: ["pods", "pods/log"]
    verbs: ["get", "list", "watch"]
\`\`\`

Testez avec : \`kubectl auth can-i list pods --as=dev-user -n dev\`

## Exercice 2 : NetworkPolicy Zero Trust

Implémentez un réseau zero trust :
1. Default deny all
2. Autorisez uniquement le frontend → API → DB

## Exercice 3 : Pod Security Standard Restricted

Déployez un pod conforme au standard Restricted et vérifiez :

\`\`\`bash
kubectl label ns production pod-security.kubernetes.io/enforce=restricted
kubectl apply -f secure-pod.yaml -n production
\`\`\`

## Exercice 4 : Politique OPA Gatekeeper

Créez une contrainte qui interdit les images sans tag ou avec :latest.`,
    keyPoints: JSON.stringify(['RBAC contrôle qui peut faire quoi sur quelles ressources dans quels namespaces', 'Les NetworkPolicies implémentent le zero trust en bloquant par défaut tout le trafic', 'Pod Security Standards enforce/audit/warn appliquent des niveaux de sécurité aux namespaces', 'Le SecurityContext définit l\'utilisateur, les capabilities et le filesystem du pod', 'OPA Gatekeeper valide les ressources à l\'admission avec des politiques Rego', 'Falco détecte les comportements suspects en runtime (shells, lectures sensibles)', 'Le principe du moindre privilège s\'applique à chaque couche (RBAC, réseau, pod, container)', 'L\'audit logging Kubernetes enregistre toutes les actions sur l\'API server pour la forensique']),
  },

  // ============================================================
  // KUBERNETES - Module 5: Troubleshooting et optimisation
  // ============================================================
  {
    id: 'k8s-05',
    courseId: 'kubernetes',
    title: 'Troubleshooting et optimisation',
    duration: '4h',
    orderIndex: 5,
    theoryContent: `# Troubleshooting et Optimisation Kubernetes

## 1. Introduction

Le troubleshooting Kubernetes nécessite une méthodologie systématique pour diagnostiquer les problèmes de pods, de réseau, de stockage et de performance. L'optimisation des ressources réduit les coûts tout en maintenant la fiabilité des applications.

## 2. Debugging des Pods

\`\`\`bash
# Diagnostic rapide
kubectl get pods -n production -o wide
kubectl describe pod <pod-name> -n production

# Vérifier les événements récents
kubectl get events -n production --sort-by='.lastTimestamp' | tail -20

# Logs du conteneur
kubectl logs <pod-name> -n production --tail=100
kubectl logs <pod-name> -n production --previous  # Conteneur crashé
kubectl logs <pod-name> -n production -c <container-name>  # Multi-container

# Debug avec éphemeral container
kubectl debug -it <pod-name> --image=busybox --target=<container-name>

# Debug avec copie du pod
kubectl debug <pod-name> --copy-to=debug-pod --container=debug \\
  --image=nicolaka/netshoot -- /bin/bash

# Statuts courants et solutions
# CrashLoopBackOff → vérifier les logs et la commande/liveness probe
# ImagePullBackOff → vérifier le secret d'accès au registry
# Pending → vérifier les ressources (requests) et les nodeSelectors
# OOMKilled → augmenter les limits de mémoire
# Evicted → noeud sous pression (disk, memory)
\`\`\`

## 3. Debugging réseau

\`\`\`bash
# Vérifier la résolution DNS
kubectl run dns-test --rm -it --image=busybox -- nslookup my-service.production.svc.cluster.local

# Tester la connectivité
kubectl run nettest --rm -it --image=nicolaka/netshoot -- bash
# Dans le pod :
curl -v http://my-service:8080/health
traceroute my-service
nmap -p 8080 my-service

# Vérifier les endpoints d'un service
kubectl get endpoints my-service -n production
kubectl describe svc my-service -n production

# Problèmes courants réseau :
# - Service sans endpoints → labels selector mismatch
# - Connection refused → pod non ready ou port incorrect
# - Timeout → NetworkPolicy bloquante
# - DNS failure → CoreDNS pods non healthy
\`\`\`

## 4. Gestion des ressources et optimisation

\`\`\`yaml
# Vertical Pod Autoscaler (recommandations)
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: api-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api
  updatePolicy:
    updateMode: "Off"  # Mode recommandation uniquement

---
# Horizontal Pod Autoscaler
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Percent
          value: 10
          periodSeconds: 60
\`\`\`

## 5. Optimisation des coûts

\`\`\`bash
# Identifier les pods sur-provisionnés
kubectl top pods -n production --sort-by=cpu
kubectl top pods -n production --sort-by=memory

# Comparer requests vs usage réel
kubectl get pods -n production -o json | jq '
  .items[] |
  {name: .metadata.name,
   cpu_request: .spec.containers[0].resources.requests.cpu,
   mem_request: .spec.containers[0].resources.requests.memory}'

# VPA recommandations
kubectl get vpa api-vpa -o json | jq '.status.recommendation'

# ResourceQuotas pour contrôler les coûts par namespace
apiVersion: v1
kind: ResourceQuota
metadata:
  name: production-quota
  namespace: production
spec:
  hard:
    requests.cpu: "20"
    requests.memory: 40Gi
    limits.cpu: "40"
    limits.memory: 80Gi
    pods: "100"
    services: "20"
    persistentvolumeclaims: "30"

# LimitRange pour les defaults
apiVersion: v1
kind: LimitRange
metadata:
  name: default-limits
  namespace: production
spec:
  limits:
    - type: Container
      default:
        cpu: 500m
        memory: 256Mi
      defaultRequest:
        cpu: 100m
        memory: 128Mi
      max:
        cpu: "2"
        memory: 2Gi
\`\`\`

## 6. Outils de diagnostic

\`\`\`bash
# kubectl-debug plugin
kubectl debug node/worker-1 -it --image=ubuntu

# k9s - interface terminal
k9s -n production

# stern - logs multi-pods
stern "api-*" -n production --since 5m

# kubectx/kubens - navigation rapide
kubectx production-cluster
kubens production

# Prometheus queries pour le diagnostic
# Pods en restart loop
increase(kube_pod_container_status_restarts_total[1h]) > 3

# Noeuds avec pression mémoire
kube_node_status_condition{condition="MemoryPressure",status="true"} == 1

# PVC presque pleins
kubelet_volume_stats_used_bytes / kubelet_volume_stats_capacity_bytes > 0.85
\`\`\``,
    practiceContent: `# Exercices pratiques - Troubleshooting

## Exercice 1 : Diagnostiquer un pod en CrashLoopBackOff

\`\`\`bash
# Déployer un pod défaillant
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: crashing-pod
spec:
  containers:
    - name: app
      image: busybox
      command: ["sh", "-c", "exit 1"]
EOF

# Diagnostiquer
kubectl describe pod crashing-pod
kubectl logs crashing-pod --previous
\`\`\`

## Exercice 2 : Debug réseau

\`\`\`bash
# Utiliser netshoot pour diagnostiquer
kubectl run netdebug --rm -it --image=nicolaka/netshoot -- bash
# nslookup, curl, traceroute, tcpdump
\`\`\`

## Exercice 3 : Optimiser les ressources

1. Déployez le VPA en mode recommandation
2. Analysez les recommandations après 24h
3. Ajustez les requests/limits

## Exercice 4 : ResourceQuota et LimitRange

Créez des quotas pour un namespace de développement et testez les limites.`,
    keyPoints: JSON.stringify(['kubectl describe et get events sont les premiers réflexes pour diagnostiquer un pod', 'Les ephemeral containers permettent le debug sans modifier le pod original', 'La résolution DNS est souvent la cause des problèmes de connectivité entre services', 'Le VPA recommande les bonnes valeurs de requests/limits basées sur l\'usage réel', 'Le HPA scale horizontalement basé sur CPU, mémoire ou métriques custom', 'Les ResourceQuotas limitent la consommation globale d\'un namespace', 'Les LimitRanges définissent des defaults et des maximums par container', 'stern et k9s améliorent significativement la productivité du troubleshooting']),
  },


  // ============================================================
  // TERRAFORM - Module 4: Providers avancés
  // ============================================================
  {
    id: 'tf-04',
    courseId: 'terraform',
    title: 'Providers avancés',
    duration: '3h',
    orderIndex: 4,
    theoryContent: `# Providers Avancés Terraform

## 1. Introduction

Les providers Terraform sont les plugins qui permettent d'interagir avec les APIs des plateformes cloud et services. Maîtriser les providers avancés permet de gérer des infrastructures complexes : VPC multi-AZ, politiques IAM, bases de données managées et configurations multi-provider.

## 2. AWS VPC avancé

\`\`\`hcl
# VPC multi-AZ avec subnets publics et privés
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "production-vpc"
    Environment = "production"
  }
}

# Subnets publics (un par AZ)
resource "aws_subnet" "public" {
  count                   = length(var.availability_zones)
  vpc_id                  = aws_vpc.main.id
  cidr_block              = cidrsubnet(aws_vpc.main.cidr_block, 8, count.index)
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "public-subnet-\\\${var.availability_zones[count.index]}"
    Tier = "public"
  }
}

# Subnets privés
resource "aws_subnet" "private" {
  count             = length(var.availability_zones)
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(aws_vpc.main.cidr_block, 8, count.index + 10)
  availability_zone = var.availability_zones[count.index]

  tags = {
    Name = "private-subnet-\\\${var.availability_zones[count.index]}"
    Tier = "private"
  }
}

# NAT Gateway pour les subnets privés
resource "aws_eip" "nat" {
  count  = length(var.availability_zones)
  domain = "vpc"
}

resource "aws_nat_gateway" "main" {
  count         = length(var.availability_zones)
  allocation_id = aws_eip.nat[count.index].id
  subnet_id     = aws_subnet.public[count.index].id

  tags = {
    Name = "nat-gw-\\\${var.availability_zones[count.index]}"
  }
}

# Route tables
resource "aws_route_table" "private" {
  count  = length(var.availability_zones)
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main[count.index].id
  }
}
\`\`\`

## 3. Security Groups

\`\`\`hcl
# Security Group pour l'API
resource "aws_security_group" "api" {
  name_prefix = "api-sg-"
  vpc_id      = aws_vpc.main.id
  description = "Security group for API servers"

  ingress {
    description     = "HTTPS from ALB"
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    description     = "PostgreSQL to DB"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.db.id]
  }

  egress {
    description = "HTTPS outbound"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }
}
\`\`\`

## 4. IAM Policies

\`\`\`hcl
# IAM Role avec assume role policy
resource "aws_iam_role" "app_role" {
  name = "app-production-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
      {
        Action = "sts:AssumeRoleWithWebIdentity"
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.eks.arn
        }
        Condition = {
          StringEquals = {
            "\\\${aws_iam_openid_connect_provider.eks.url}:sub" = "system:serviceaccount:production:api"
          }
        }
      }
    ]
  })
}

# Politique IAM personnalisée
resource "aws_iam_policy" "app_policy" {
  name        = "app-production-policy"
  description = "Policy for production application"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.app_data.arn,
          "\\\${aws_s3_bucket.app_data.arn}/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue"
        ]
        Resource = "arn:aws:secretsmanager:*:*:secret:production/*"
      }
    ]
  })
}
\`\`\`

## 5. RDS Database

\`\`\`hcl
resource "aws_db_instance" "main" {
  identifier     = "production-postgres"
  engine         = "postgres"
  engine_version = "16.1"
  instance_class = "db.r6g.large"

  allocated_storage     = 100
  max_allocated_storage = 500
  storage_type          = "gp3"
  storage_encrypted     = true
  kms_key_id            = aws_kms_key.db.arn

  db_name  = "appdb"
  username = "admin"
  password = var.db_password

  multi_az               = true
  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.db.id]

  backup_retention_period = 30
  backup_window           = "03:00-04:00"
  maintenance_window      = "sun:04:00-sun:05:00"

  deletion_protection       = true
  skip_final_snapshot       = false
  final_snapshot_identifier = "production-postgres-final"

  performance_insights_enabled = true
  monitoring_interval          = 60
  monitoring_role_arn          = aws_iam_role.rds_monitoring.arn

  tags = {
    Environment = "production"
    Backup      = "daily"
  }
}
\`\`\`

## 6. Multi-provider

\`\`\`hcl
# Configuration multi-provider
provider "aws" {
  region = "eu-west-1"
  alias  = "primary"
}

provider "aws" {
  region = "us-east-1"
  alias  = "dr"
}

# Ressource dans la région primaire
resource "aws_s3_bucket" "primary" {
  provider = aws.primary
  bucket   = "app-data-eu"
}

# Réplication cross-region
resource "aws_s3_bucket" "replica" {
  provider = aws.dr
  bucket   = "app-data-us-replica"
}

resource "aws_s3_bucket_replication_configuration" "replication" {
  provider = aws.primary
  bucket   = aws_s3_bucket.primary.id
  role     = aws_iam_role.replication.arn

  rule {
    id     = "replicate-all"
    status = "Enabled"
    destination {
      bucket        = aws_s3_bucket.replica.arn
      storage_class = "STANDARD_IA"
    }
  }
}
\`\`\``,
    practiceContent: `# Exercices pratiques - Providers avancés

## Exercice 1 : VPC multi-AZ

\`\`\`hcl
variable "availability_zones" {
  default = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
}

# Créez un VPC avec subnets publics, privés, NAT et IGW
# Testez avec : terraform plan
\`\`\`

## Exercice 2 : Security Groups chaînés

Créez une chaîne : ALB → API → DB avec les security groups appropriés.

## Exercice 3 : IAM avec moindre privilège

\`\`\`hcl
# Créez un role IAM pour une application EKS
# avec uniquement les permissions S3 et SecretsManager nécessaires
\`\`\`

## Exercice 4 : RDS avec multi-AZ et monitoring

Déployez une instance RDS PostgreSQL avec :
- Multi-AZ activé
- Chiffrement
- Backups 30 jours
- Performance Insights`,
    keyPoints: JSON.stringify(['cidrsubnet() calcule automatiquement les plages CIDR pour les subnets', 'Les NAT Gateways par AZ assurent la haute disponibilité de l\'accès internet privé', 'Les Security Groups référencent d\'autres SG pour un contrôle d\'accès en chaîne', 'Les IAM Roles avec IRSA permettent l\'accès AWS sécurisé depuis les pods EKS', 'jsonencode() génère des politiques IAM propres et validées par Terraform', 'Le multi-provider avec alias gère les déploiements cross-region', 'lifecycle create_before_destroy évite les interruptions lors des mises à jour de SG', 'Le chiffrement KMS et la suppression protégée sont essentiels pour les bases de données']),
  },

  // ============================================================
  // TERRAFORM - Module 5: Testing et sécurité Terraform
  // ============================================================
  {
    id: 'tf-05',
    courseId: 'terraform',
    title: 'Testing et sécurité Terraform',
    duration: '3h',
    orderIndex: 5,
    theoryContent: `# Testing et Sécurité Terraform

## 1. Introduction

Tester et sécuriser le code Terraform est essentiel pour éviter les erreurs coûteuses et les failles de sécurité dans l'infrastructure. Les outils modernes permettent de valider le code statiquement (tfsec, checkov), de tester les modules (terraform test, terratest) et d'appliquer des politiques (Sentinel).

## 2. terraform test (natif, depuis 1.6)

\`\`\`hcl
# tests/vpc.tftest.hcl
variables {
  vpc_cidr         = "10.0.0.0/16"
  environment      = "test"
  availability_zones = ["eu-west-1a", "eu-west-1b"]
}

run "vpc_creation" {
  command = plan

  assert {
    condition     = aws_vpc.main.cidr_block == "10.0.0.0/16"
    error_message = "VPC CIDR block incorrect"
  }

  assert {
    condition     = aws_vpc.main.enable_dns_hostnames == true
    error_message = "DNS hostnames should be enabled"
  }
}

run "subnet_count" {
  command = plan

  assert {
    condition     = length(aws_subnet.public) == 2
    error_message = "Should create 2 public subnets"
  }

  assert {
    condition     = length(aws_subnet.private) == 2
    error_message = "Should create 2 private subnets"
  }
}

run "security_group_rules" {
  command = plan

  assert {
    condition     = !aws_security_group.api.ingress[0].cidr_blocks[0] == "0.0.0.0/0"
    error_message = "API SG should not allow all inbound traffic"
  }
}
\`\`\`

\`\`\`bash
# Exécuter les tests
terraform test
terraform test -verbose
terraform test -filter=tests/vpc.tftest.hcl
\`\`\`

## 3. Terratest (tests d'intégration en Go)

\`\`\`go
// test/vpc_test.go
package test

import (
    "testing"
    "github.com/gruntwork-io/terratest/modules/terraform"
    "github.com/gruntwork-io/terratest/modules/aws"
    "github.com/stretchr/testify/assert"
)

func TestVPCCreation(t *testing.T) {
    t.Parallel()

    terraformOptions := &terraform.Options{
        TerraformDir: "../modules/vpc",
        Vars: map[string]interface{}{
            "vpc_cidr":    "10.99.0.0/16",
            "environment": "test",
            "region":      "eu-west-1",
        },
    }

    defer terraform.Destroy(t, terraformOptions)
    terraform.InitAndApply(t, terraformOptions)

    // Vérifier le VPC
    vpcId := terraform.Output(t, terraformOptions, "vpc_id")
    vpc := aws.GetVpcById(t, vpcId, "eu-west-1")
    assert.Equal(t, "10.99.0.0/16", vpc.CidrBlock)

    // Vérifier les subnets
    subnets := terraform.OutputList(t, terraformOptions, "private_subnet_ids")
    assert.Equal(t, 2, len(subnets))
}

func TestRDSEncryption(t *testing.T) {
    t.Parallel()

    terraformOptions := &terraform.Options{
        TerraformDir: "../modules/rds",
        Vars: map[string]interface{}{
            "instance_class": "db.t3.micro",
            "environment":    "test",
        },
    }

    defer terraform.Destroy(t, terraformOptions)
    terraform.InitAndApply(t, terraformOptions)

    dbInstanceId := terraform.Output(t, terraformOptions, "db_instance_id")
    dbInstance := aws.GetRdsInstanceById(t, dbInstanceId, "eu-west-1")
    assert.True(t, dbInstance.StorageEncrypted)
}
\`\`\`

## 4. tfsec - Analyse de sécurité statique

\`\`\`bash
# Installation
brew install tfsec

# Scanner un répertoire
tfsec .
tfsec ./modules/vpc --format json

# Résultats typiques :
# HIGH - aws_security_group.api: Security group rule allows ingress from 0.0.0.0/0
# CRITICAL - aws_db_instance.main: Database instance is not encrypted
# MEDIUM - aws_s3_bucket.data: Bucket does not have versioning enabled

# Ignorer un avertissement avec justification
resource "aws_security_group_rule" "public_https" {
  #tfsec:ignore:aws-ec2-no-public-ingress-sgr[Reason: Public ALB needs internet access]
  type        = "ingress"
  from_port   = 443
  to_port     = 443
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}

# Configuration .tfsec.yml
severity_overrides:
  aws-s3-enable-bucket-logging: LOW

exclude:
  - aws-ec2-no-public-ingress-sgr
\`\`\`

## 5. Checkov

\`\`\`bash
# Installation
pip install checkov

# Scanner
checkov -d . --framework terraform
checkov -f main.tf --check CKV_AWS_18,CKV_AWS_19

# Frameworks supportés
# CKV_AWS_* : checks AWS
# CKV_AZURE_* : checks Azure
# CKV_GCP_* : checks GCP
# CKV2_* : checks composites

# Output dans le pipeline
checkov -d . --output junitxml > checkov-report.xml
checkov -d . --compact --quiet

# Politique custom
# custom_checks/s3_naming.py
from checkov.terraform.checks.resource.base_resource_check import BaseResourceCheck

class S3NamingConvention(BaseResourceCheck):
    def __init__(self):
        name = "Ensure S3 bucket follows naming convention"
        id = "CKV_CUSTOM_1"
        supported_resources = ['aws_s3_bucket']
        super().__init__(name=name, id=id, supported_resources=supported_resources)

    def scan_resource_conf(self, conf):
        bucket_name = conf.get("bucket", [""])[0]
        if bucket_name.startswith(("prod-", "staging-", "dev-")):
            return "PASSED"
        return "FAILED"
\`\`\`

## 6. Sentinel (HashiCorp)

\`\`\`python
# policy/enforce-encryption.sentinel
import "tfplan/v2" as tfplan

# Tous les buckets S3 doivent avoir le chiffrement activé
s3_buckets = filter tfplan.resource_changes as _, rc {
    rc.type is "aws_s3_bucket" and
    rc.mode is "managed" and
    (rc.change.actions contains "create" or rc.change.actions contains "update")
}

encryption_check = rule {
    all s3_buckets as _, bucket {
        bucket.change.after.server_side_encryption_configuration is not empty
    }
}

# Pas d'instances publiques
no_public_instances = rule {
    all filter tfplan.resource_changes as _, rc {
        rc.type is "aws_instance"
    } as _, instance {
        instance.change.after.associate_public_ip_address is false
    }
}

main = rule {
    encryption_check and no_public_instances
}
\`\`\``,
    practiceContent: `# Exercices pratiques - Testing et sécurité

## Exercice 1 : terraform test

\`\`\`hcl
# Créez un fichier de test pour votre module VPC
# tests/main.tftest.hcl
run "validate_vpc" {
  command = plan
  assert {
    condition = aws_vpc.main.enable_dns_support == true
    error_message = "DNS support must be enabled"
  }
}
\`\`\`

Exécutez : \`terraform test\`

## Exercice 2 : Scanner avec tfsec

\`\`\`bash
tfsec . --format lovely
# Corrigez les issues HIGH et CRITICAL trouvées
\`\`\`

## Exercice 3 : Checkov dans le pipeline

\`\`\`bash
checkov -d . --framework terraform \\
  --output cli --compact
# Intégrez dans votre CI avec --output junitxml
\`\`\`

## Exercice 4 : Custom check Checkov

Écrivez un check custom qui vérifie que tous les RDS ont des backups >= 7 jours.`,
    keyPoints: JSON.stringify(['terraform test (natif depuis 1.6) valide les modules avec des assertions HCL', 'Terratest exécute de vrais déploiements en Go pour les tests d\'intégration', 'tfsec analyse statiquement le code HCL pour détecter les failles de sécurité', 'Checkov supporte des centaines de checks prédéfinis et des checks custom Python', 'Sentinel (Terraform Cloud/Enterprise) applique des politiques as code avant le plan/apply', 'Les annotations tfsec:ignore documentent les exceptions avec justification', 'Les tests d\'intégration avec defer Destroy() garantissent le nettoyage des ressources', 'L\'intégration CI/CD avec --exit-code bloque les déploiements non conformes']),
  },


  // ============================================================
  // ANSIBLE - Module 4: Ansible pour Docker et Kubernetes
  // ============================================================
  {
    id: 'ans-04',
    courseId: 'ansible',
    title: 'Ansible pour Docker et Kubernetes',
    duration: '3h',
    orderIndex: 4,
    theoryContent: `# Ansible pour Docker et Kubernetes

## 1. Introduction

Ansible offre des modules puissants pour gérer Docker et Kubernetes de manière déclarative. Les collections **community.docker** et **kubernetes.core** permettent de construire, déployer et orchestrer des conteneurs et des ressources Kubernetes directement depuis des playbooks.

Ces modules sont utiles pour :
- Automatiser la construction et le push d'images Docker
- Déployer des stacks Docker Compose
- Gérer des ressources Kubernetes (manifests, Helm charts)
- Orchestrer des déploiements cross-platform

## 2. Module docker_container

\`\`\`yaml
---
# playbook-docker.yml
- name: Déployer l'application avec Docker
  hosts: docker_hosts
  become: true
  collections:
    - community.docker

  tasks:
    - name: Construire l'image Docker
      community.docker.docker_image:
        name: "registry.company.com/api"
        tag: "{{ app_version }}"
        source: build
        build:
          path: /opt/app
          dockerfile: Dockerfile
          args:
            NODE_ENV: production
        push: true

    - name: Créer le réseau applicatif
      community.docker.docker_network:
        name: app_network
        driver: bridge
        ipam_config:
          - subnet: 172.20.0.0/16

    - name: Déployer PostgreSQL
      community.docker.docker_container:
        name: postgres
        image: postgres:16-alpine
        state: started
        restart_policy: unless-stopped
        env:
          POSTGRES_DB: "appdb"
          POSTGRES_USER: "app"
          POSTGRES_PASSWORD: "{{ vault_db_password }}"
        volumes:
          - postgres_data:/var/lib/postgresql/data
        networks:
          - name: app_network
        healthcheck:
          test: ["CMD-SHELL", "pg_isready -U app"]
          interval: 10s
          timeout: 5s
          retries: 5

    - name: Déployer l'API
      community.docker.docker_container:
        name: api
        image: "registry.company.com/api:{{ app_version }}"
        state: started
        restart_policy: unless-stopped
        ports:
          - "8080:3000"
        env:
          DATABASE_URL: "postgresql://app:{{ vault_db_password }}@postgres:5432/appdb"
          NODE_ENV: "production"
        networks:
          - name: app_network
        healthcheck:
          test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
          interval: 30s
          timeout: 5s
          retries: 3
        labels:
          service: api
          version: "{{ app_version }}"

    - name: Nettoyer les anciennes images
      community.docker.docker_prune:
        images: true
        images_filters:
          dangling: true
        builder_cache: true
\`\`\`

## 3. Docker Compose avec Ansible

\`\`\`yaml
- name: Déployer avec Docker Compose
  hosts: docker_hosts
  tasks:
    - name: Copier le fichier compose
      ansible.builtin.template:
        src: docker-compose.yml.j2
        dest: /opt/app/docker-compose.yml

    - name: Démarrer les services
      community.docker.docker_compose_v2:
        project_src: /opt/app
        state: present
        pull: always
        env_files:
          - .env.production

    - name: Scaler un service
      community.docker.docker_compose_v2:
        project_src: /opt/app
        state: present
        services:
          - api
        scale:
          api: 3
\`\`\`

## 4. Module kubernetes.core.k8s

\`\`\`yaml
---
# playbook-k8s.yml
- name: Déployer sur Kubernetes
  hosts: localhost
  connection: local
  collections:
    - kubernetes.core

  tasks:
    - name: Créer le namespace
      kubernetes.core.k8s:
        state: present
        definition:
          apiVersion: v1
          kind: Namespace
          metadata:
            name: "{{ namespace }}"
            labels:
              environment: production

    - name: Déployer l'application
      kubernetes.core.k8s:
        state: present
        definition:
          apiVersion: apps/v1
          kind: Deployment
          metadata:
            name: api
            namespace: "{{ namespace }}"
          spec:
            replicas: "{{ replicas | default(3) }}"
            selector:
              matchLabels:
                app: api
            template:
              metadata:
                labels:
                  app: api
              spec:
                containers:
                  - name: api
                    image: "registry.company.com/api:{{ app_version }}"
                    ports:
                      - containerPort: 3000
                    resources:
                      requests:
                        memory: "128Mi"
                        cpu: "100m"
                      limits:
                        memory: "256Mi"
                        cpu: "500m"

    - name: Attendre que le déploiement soit prêt
      kubernetes.core.k8s_info:
        api_version: apps/v1
        kind: Deployment
        name: api
        namespace: "{{ namespace }}"
      register: deployment
      until: deployment.resources[0].status.readyReplicas == (replicas | default(3))
      retries: 30
      delay: 10

    - name: Appliquer des manifests depuis des fichiers
      kubernetes.core.k8s:
        state: present
        src: "{{ item }}"
        namespace: "{{ namespace }}"
      loop:
        - manifests/service.yaml
        - manifests/ingress.yaml
        - manifests/hpa.yaml
\`\`\`

## 5. Helm avec Ansible

\`\`\`yaml
- name: Déployer avec Helm
  hosts: localhost
  tasks:
    - name: Ajouter le repo Helm
      kubernetes.core.helm_repository:
        name: prometheus-community
        repo_url: https://prometheus-community.github.io/helm-charts

    - name: Installer le monitoring stack
      kubernetes.core.helm:
        name: monitoring
        chart_ref: prometheus-community/kube-prometheus-stack
        release_namespace: monitoring
        create_namespace: true
        values:
          prometheus:
            retention: 30d
            storageSpec:
              volumeClaimTemplate:
                spec:
                  storageClassName: fast-ssd
                  resources:
                    requests:
                      storage: 100Gi
          grafana:
            adminPassword: "{{ vault_grafana_password }}"
            ingress:
              enabled: true
              hosts:
                - grafana.company.com
        wait: true
        timeout: "10m0s"

    - name: Déployer l'application via Helm
      kubernetes.core.helm:
        name: myapp
        chart_ref: ./charts/myapp
        release_namespace: production
        values_files:
          - values-production.yaml
        set_values:
          - value: "image.tag={{ app_version }}"
          - value: "ingress.host=api.company.com"
\`\`\`

## 6. Patterns avancés

\`\`\`yaml
# Rolling update avec validation
- name: Rolling update Kubernetes
  hosts: localhost
  tasks:
    - name: Mettre à jour l'image
      kubernetes.core.k8s:
        state: present
        definition:
          apiVersion: apps/v1
          kind: Deployment
          metadata:
            name: api
            namespace: production
          spec:
            template:
              spec:
                containers:
                  - name: api
                    image: "registry.company.com/api:{{ new_version }}"

    - name: Vérifier le rollout
      kubernetes.core.k8s_info:
        api_version: apps/v1
        kind: Deployment
        name: api
        namespace: production
      register: deploy_status
      until: >
        deploy_status.resources[0].status.updatedReplicas ==
        deploy_status.resources[0].status.replicas
      retries: 60
      delay: 5

    - name: Rollback si échec
      kubernetes.core.k8s:
        state: present
        definition:
          apiVersion: apps/v1
          kind: Deployment
          metadata:
            name: api
            namespace: production
          spec:
            template:
              spec:
                containers:
                  - name: api
                    image: "registry.company.com/api:{{ old_version }}"
      when: deploy_status is failed
\`\`\``,
    practiceContent: `# Exercices pratiques - Docker et Kubernetes

## Exercice 1 : Déployer un stack Docker

\`\`\`yaml
- name: Deploy stack
  hosts: docker_hosts
  tasks:
    - community.docker.docker_container:
        name: redis
        image: redis:7-alpine
        state: started
        ports: ["6379:6379"]
\`\`\`

## Exercice 2 : Déployer sur Kubernetes

\`\`\`yaml
- name: K8s deployment
  hosts: localhost
  tasks:
    - kubernetes.core.k8s:
        state: present
        src: deployment.yaml
        namespace: dev
\`\`\`

## Exercice 3 : Helm release avec Ansible

Déployez nginx-ingress avec le module helm.

## Exercice 4 : Rolling update avec validation

Créez un playbook qui met à jour l'image et vérifie le rollout.`,
    keyPoints: JSON.stringify(['community.docker.docker_container gère le cycle de vie complet des conteneurs', 'docker_compose_v2 déploie des stacks multi-services depuis un fichier compose', 'kubernetes.core.k8s applique des manifests Kubernetes de manière déclarative', 'k8s_info avec until/retries attend qu\'une ressource atteigne l\'état souhaité', 'kubernetes.core.helm gère les releases Helm avec values et wait', 'Les variables Ansible Vault sécurisent les secrets dans les playbooks Docker/K8s', 'Le pattern until/retries/delay implémente les health checks post-déploiement', 'Le rollback conditionnel (when: failed) assure la résilience des déploiements']),
  },

  // ============================================================
  // ANSIBLE - Module 5: Ansible Tower/AWX
  // ============================================================
  {
    id: 'ans-05',
    courseId: 'ansible',
    title: 'Ansible Tower/AWX',
    duration: '3h',
    orderIndex: 5,
    theoryContent: `# Ansible Tower / AWX

## 1. Introduction

**Ansible Tower** (version commerciale) et **AWX** (version open source) fournissent une interface web, une API REST et des fonctionnalités d'entreprise pour Ansible : gestion centralisée des inventaires, RBAC, workflows, planification et audit. AWX est le projet upstream de Tower.

## 2. Concepts clés

\`\`\`
┌─────────────────────────────────────────────┐
│              AWX / Tower                     │
├─────────────────────────────────────────────┤
│  Organizations                              │
│  └── Projects (repos Git de playbooks)      │
│  └── Inventories (groupes d'hôtes)          │
│  └── Credentials (SSH, cloud, vault)        │
│  └── Job Templates (playbook + params)      │
│  └── Workflow Templates (chaînes de jobs)   │
│  └── Schedules (planification cron)         │
└─────────────────────────────────────────────┘
\`\`\`

## 3. Inventaires dynamiques

\`\`\`yaml
# Inventaire dynamique AWS EC2
# Source : AWS EC2
# Credential : aws-production
# Variables :
plugin: amazon.aws.aws_ec2
regions:
  - eu-west-1
  - eu-west-3
keyed_groups:
  - key: tags.Environment
    prefix: env
  - key: tags.Role
    prefix: role
  - key: placement.availability_zone
    prefix: az
filters:
  instance-state-name: running
  "tag:ManagedBy": ansible
compose:
  ansible_host: private_ip_address
\`\`\`

\`\`\`bash
# API - Synchroniser un inventaire
curl -X POST "https://awx.company.com/api/v2/inventories/5/update_inventory_sources/" \\
  -H "Authorization: Bearer \\\$TOKEN"

# Lister les hôtes d'un inventaire
curl "https://awx.company.com/api/v2/inventories/5/hosts/" \\
  -H "Authorization: Bearer \\\$TOKEN"
\`\`\`

## 4. Job Templates

\`\`\`bash
# API - Créer un Job Template
curl -X POST "https://awx.company.com/api/v2/job_templates/" \\
  -H "Authorization: Bearer \\\$TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Deploy Application",
    "job_type": "run",
    "inventory": 5,
    "project": 3,
    "playbook": "deploy.yml",
    "credential": 7,
    "extra_vars": "app_version: latest",
    "ask_variables_on_launch": true,
    "ask_limit_on_launch": true,
    "timeout": 600,
    "verbosity": 1
  }'

# Lancer un job
curl -X POST "https://awx.company.com/api/v2/job_templates/12/launch/" \\
  -H "Authorization: Bearer \\\$TOKEN" \\
  -d '{
    "extra_vars": {"app_version": "2.1.0", "environment": "production"},
    "limit": "webservers"
  }'

# Suivre l'exécution
curl "https://awx.company.com/api/v2/jobs/456/stdout/?format=txt" \\
  -H "Authorization: Bearer \\\$TOKEN"
\`\`\`

## 5. Workflows

Les workflows chaînent plusieurs Job Templates avec des conditions :

\`\`\`yaml
# Structure d'un workflow
Workflow: "Full Deployment Pipeline"
├── Node 1: "Run Tests" (Job Template)
│   ├── On Success → Node 2
│   └── On Failure → Node 5 (Notify Failure)
├── Node 2: "Deploy Staging" (Job Template)
│   ├── On Success → Node 3
│   └── On Failure → Node 5
├── Node 3: "Integration Tests" (Job Template)
│   ├── On Success → Node 4
│   └── On Failure → Node 6 (Rollback Staging)
├── Node 4: "Deploy Production" (Job Template, Manual Approval)
│   ├── On Success → Node 7 (Notify Success)
│   └── On Failure → Node 8 (Rollback Production)
└── ...
\`\`\`

\`\`\`bash
# API - Créer un workflow
curl -X POST "https://awx.company.com/api/v2/workflow_job_templates/" \\
  -H "Authorization: Bearer \\\$TOKEN" \\
  -d '{
    "name": "Full Deployment",
    "organization": 1,
    "survey_enabled": true,
    "ask_variables_on_launch": true
  }'

# Ajouter des noeuds au workflow
curl -X POST "https://awx.company.com/api/v2/workflow_job_templates/20/workflow_nodes/" \\
  -d '{"unified_job_template": 12}'
\`\`\`

## 6. RBAC (Contrôle d'accès)

\`\`\`
Hiérarchie RBAC :
- Organization Admin : gère tout dans l'organisation
- Team Admin : gère les membres de l'équipe
- Project Admin : gère les projets et playbooks
- Inventory Admin : gère les inventaires
- Job Template Execute : peut lancer des jobs
- Job Template Read : peut voir les résultats

Exemple :
- Équipe "Developers" :
  - Execute sur "Deploy Staging"
  - Read sur "Deploy Production"
  - Admin sur "Dev Inventory"

- Équipe "Operations" :
  - Admin sur tous les Job Templates
  - Admin sur tous les Inventaires
  - Admin sur les Credentials production
\`\`\`

## 7. API et intégration CI/CD

\`\`\`bash
# Webhook depuis GitLab CI
# .gitlab-ci.yml
deploy_staging:
  stage: deploy
  script:
    - |
      JOB_ID=\\\$(curl -s -X POST "https://awx.company.com/api/v2/job_templates/12/launch/" \\
        -H "Authorization: Bearer \\\$AWX_TOKEN" \\
        -d "{\\\"extra_vars\\\": {\\\"version\\\": \\\"\\\$CI_COMMIT_TAG\\\"}}" | jq '.id')

      # Attendre la fin du job
      while true; do
        STATUS=\\\$(curl -s "https://awx.company.com/api/v2/jobs/\\\$JOB_ID/" \\
          -H "Authorization: Bearer \\\$AWX_TOKEN" | jq -r '.status')
        if [ "\\\$STATUS" = "successful" ]; then break; fi
        if [ "\\\$STATUS" = "failed" ]; then exit 1; fi
        sleep 10
      done

# Callback pour les hôtes dynamiques
# Configuration du host pour callback AWX
curl -X POST "https://awx.company.com/api/v2/job_templates/15/callback/" \\
  -d '{"host_config_key": "abc123"}'
\`\`\``,
    practiceContent: `# Exercices pratiques - AWX/Tower

## Exercice 1 : Configurer un projet et inventaire

1. Créez un projet pointant vers votre repo Git
2. Créez un inventaire avec des groupes
3. Ajoutez des credentials SSH

## Exercice 2 : Job Template avec survey

\`\`\`bash
# Créez un Job Template avec des questions
# Survey :
# - version (text, required)
# - environment (choice: dev/staging/prod)
# - dry_run (boolean, default: true)
\`\`\`

## Exercice 3 : Workflow de déploiement

Créez un workflow :
1. Tests → Deploy Staging → Smoke Tests → Deploy Prod

## Exercice 4 : Intégration API

\`\`\`bash
# Lancez un job via l'API
curl -X POST "https://awx/api/v2/job_templates/1/launch/" \\
  -H "Authorization: Bearer \\\$TOKEN" \\
  -d '{"extra_vars":{"version":"1.0.0"}}'
\`\`\``,
    keyPoints: JSON.stringify(['AWX/Tower fournit une interface web, RBAC et audit pour les playbooks Ansible', 'Les inventaires dynamiques synchronisent automatiquement les hôtes depuis AWS, Azure, GCP', 'Les Job Templates encapsulent un playbook avec ses paramètres et credentials', 'Les Workflows chaînent les jobs avec des conditions success/failure/always', 'Le RBAC granulaire contrôle qui peut exécuter quoi sur quels inventaires', 'L\'API REST permet l\'intégration avec les pipelines CI/CD externes', 'Les surveys ajoutent des formulaires de saisie lors du lancement des jobs', 'Les callbacks permettent aux hôtes de déclencher leur propre configuration']),
  },


  // ============================================================
  // GITLAB CI - Module 4: Sécurité et compliance
  // ============================================================
  {
    id: 'glci-04',
    courseId: 'gitlab-ci',
    title: 'Sécurité et compliance',
    duration: '3h',
    orderIndex: 4,
    theoryContent: `# Sécurité et Compliance GitLab CI

## 1. Introduction

GitLab intègre nativement des outils de sécurité dans le pipeline CI/CD : **SAST** (analyse statique), **DAST** (analyse dynamique), **Dependency Scanning**, **Container Scanning** et **Compliance Frameworks**. Ces outils détectent les vulnérabilités automatiquement à chaque commit.

## 2. SAST (Static Application Security Testing)

\`\`\`yaml
# .gitlab-ci.yml
include:
  - template: Security/SAST.gitlab-ci.yml

variables:
  SAST_EXCLUDED_PATHS: "test/,vendor/"
  SAST_EXCLUDED_ANALYZERS: "eslint"
  SEARCH_MAX_DEPTH: 10

# Personnalisation
sast:
  stage: test
  variables:
    SAST_JAVA_VERSION: "17"
    SCAN_KUBERNETES_MANIFESTS: "true"
  rules:
    - if: \\\$CI_MERGE_REQUEST_IID
    - if: \\\$CI_COMMIT_BRANCH == \\\$CI_DEFAULT_BRANCH

# Analyseurs SAST inclus :
# - Semgrep (multi-langage)
# - SpotBugs (Java)
# - Flawfinder (C/C++)
# - Gosec (Go)
# - NodeJsScan (JavaScript)
# - PHPStan (PHP)
# - Bandit (Python)
\`\`\`

## 3. DAST (Dynamic Application Security Testing)

\`\`\`yaml
include:
  - template: Security/DAST.gitlab-ci.yml

dast:
  stage: dast
  variables:
    DAST_WEBSITE: "https://staging.company.com"
    DAST_FULL_SCAN_ENABLED: "true"
    DAST_BROWSER_SCAN: "true"
    DAST_AUTH_URL: "https://staging.company.com/login"
    DAST_USERNAME: "test-user"
    DAST_PASSWORD_FIELD: "password"
    DAST_USERNAME_FIELD: "username"
  rules:
    - if: \\\$CI_MERGE_REQUEST_IID
      when: manual
    - if: \\\$CI_COMMIT_BRANCH == "main"

# DAST API scan
dast_api:
  stage: dast
  variables:
    DAST_API_OPENAPI: "https://staging.company.com/api/openapi.json"
    DAST_API_TARGET_URL: "https://staging.company.com"
\`\`\`

## 4. Dependency Scanning

\`\`\`yaml
include:
  - template: Security/Dependency-Scanning.gitlab-ci.yml

dependency_scanning:
  stage: test
  variables:
    DS_EXCLUDED_PATHS: "test/"
    DS_MAX_DEPTH: 5
  rules:
    - if: \\\$CI_MERGE_REQUEST_IID
    - if: \\\$CI_COMMIT_BRANCH == \\\$CI_DEFAULT_BRANCH

# Analyseurs :
# - Gemnasium (multi-langage : npm, pip, maven, go, nuget)
# - Bundler-audit (Ruby)
# - Retire.js (JavaScript)
\`\`\`

## 5. Container Scanning

\`\`\`yaml
include:
  - template: Security/Container-Scanning.gitlab-ci.yml

container_scanning:
  stage: test
  variables:
    CS_IMAGE: "\\\$CI_REGISTRY_IMAGE:\\\$CI_COMMIT_SHA"
    CS_SEVERITY_THRESHOLD: "HIGH"
    CS_DOCKERFILE_PATH: "Dockerfile"
  rules:
    - if: \\\$CI_COMMIT_BRANCH == \\\$CI_DEFAULT_BRANCH
      exists:
        - Dockerfile

# Le scanner utilise Trivy par défaut
# Résultats visibles dans :
# - Security Dashboard
# - Merge Request widget
# - Vulnerability Report
\`\`\`

## 6. Compliance Frameworks

\`\`\`yaml
# Compliance pipeline (appliqué automatiquement)
# Fichier dans le projet de compliance
# .gitlab/compliance-pipeline.yml

include:
  - template: Security/SAST.gitlab-ci.yml
  - template: Security/Dependency-Scanning.gitlab-ci.yml
  - template: Security/Secret-Detection.gitlab-ci.yml

stages:
  - .pre
  - build
  - test
  - security
  - compliance-check
  - deploy

compliance_check:
  stage: compliance-check
  script:
    - echo "Vérification de conformité"
    - |
      if [ -z "\\\$SECURITY_APPROVAL" ]; then
        echo "ERREUR: Approbation sécurité requise pour le déploiement en production"
        exit 1
      fi
  rules:
    - if: \\\$CI_COMMIT_BRANCH == "main"

# Configuration du framework dans les paramètres du groupe
# Settings > General > Compliance framework
# - Label: SOC2
# - Pipeline: .gitlab/compliance-pipeline.yml
# - Projets assignés automatiquement
\`\`\`

## 7. Secret Detection

\`\`\`yaml
include:
  - template: Security/Secret-Detection.gitlab-ci.yml

secret_detection:
  stage: test
  variables:
    SECRET_DETECTION_HISTORIC_SCAN: "true"
    SECRET_DETECTION_EXCLUDED_PATHS: "test/"

# Patterns détectés :
# - AWS Access Keys / Secret Keys
# - Private SSH Keys
# - API tokens (GitHub, GitLab, Slack)
# - Database connection strings
# - Certificats privés
\`\`\`

## 8. Security Dashboard et gestion des vulnérabilités

\`\`\`bash
# API pour récupérer les vulnérabilités
curl "https://gitlab.company.com/api/v4/projects/123/vulnerability_findings" \\
  -H "PRIVATE-TOKEN: \\\$GITLAB_TOKEN" \\
  --data-urlencode "severity[]=critical" \\
  --data-urlencode "severity[]=high"

# Confirmer une vulnérabilité
curl -X POST "https://gitlab.company.com/api/v4/projects/123/vulnerabilities/456/confirm" \\
  -H "PRIVATE-TOKEN: \\\$GITLAB_TOKEN"

# Créer une issue depuis une vulnérabilité
curl -X POST "https://gitlab.company.com/api/v4/projects/123/vulnerabilities/456/issue" \\
  -H "PRIVATE-TOKEN: \\\$GITLAB_TOKEN"
\`\`\``,
    practiceContent: `# Exercices pratiques - Sécurité et compliance

## Exercice 1 : Activer tous les scanners de sécurité

\`\`\`yaml
include:
  - template: Security/SAST.gitlab-ci.yml
  - template: Security/Dependency-Scanning.gitlab-ci.yml
  - template: Security/Secret-Detection.gitlab-ci.yml
  - template: Security/Container-Scanning.gitlab-ci.yml
\`\`\`

Lancez le pipeline et analysez les résultats dans le Security Dashboard.

## Exercice 2 : DAST sur votre application staging

Configurez un scan DAST complet avec authentification.

## Exercice 3 : Compliance pipeline

Créez un compliance framework qui impose :
- SAST obligatoire
- Pas de secrets dans le code
- Approbation sécurité avant production

## Exercice 4 : Gestion des vulnérabilités

Via l'API, listez les vulnérabilités critiques et créez des issues pour les corriger.`,
    keyPoints: JSON.stringify(['SAST analyse le code source sans exécution pour détecter les vulnérabilités', 'DAST teste l\'application en cours d\'exécution comme un attaquant externe', 'Dependency Scanning détecte les CVE dans les dépendances tierces (npm, pip, maven)', 'Container Scanning analyse les images Docker pour les vulnérabilités des packages OS', 'Secret Detection empêche la publication de clés API et mots de passe dans le code', 'Les Compliance Frameworks imposent des pipelines de sécurité à tous les projets d\'un groupe', 'Le Security Dashboard centralise toutes les vulnérabilités avec suivi du cycle de vie', 'Les scanners s\'intègrent via include: template: sans configuration supplémentaire']),
  },

  // ============================================================
  // GITLAB CI - Module 5: Pipelines avancés
  // ============================================================
  {
    id: 'glci-05',
    courseId: 'gitlab-ci',
    title: 'Pipelines avancés',
    duration: '3h',
    orderIndex: 5,
    theoryContent: `# Pipelines Avancés GitLab CI

## 1. Introduction

GitLab CI offre des patterns de pipelines avancés pour les organisations complexes : pipelines **parent-child** pour la modularité, **multi-project** pour les dépendances entre repos, **dynamic pipelines** pour la génération à la volée, et **merge trains** pour l'intégration continue à haute fréquence.

## 2. Pipelines Parent-Child

\`\`\`yaml
# .gitlab-ci.yml (parent)
stages:
  - generate
  - trigger

generate-config:
  stage: generate
  script:
    - |
      cat > child-pipeline.yml <<EOF
      stages:
        - build
        - test
      build:
        stage: build
        script: echo "Building \\\${SERVICE_NAME}"
      test:
        stage: test
        script: echo "Testing \\\${SERVICE_NAME}"
      EOF
  artifacts:
    paths:
      - child-pipeline.yml

trigger-child:
  stage: trigger
  trigger:
    include:
      - artifact: child-pipeline.yml
        job: generate-config
    strategy: depend  # Le parent attend le child

# Trigger avec fichier existant
trigger-backend:
  stage: trigger
  trigger:
    include:
      - local: backend/.gitlab-ci.yml
    strategy: depend
  rules:
    - changes:
        - backend/**

trigger-frontend:
  stage: trigger
  trigger:
    include:
      - local: frontend/.gitlab-ci.yml
    strategy: depend
  rules:
    - changes:
        - frontend/**
\`\`\`

## 3. Pipelines Multi-Project

\`\`\`yaml
# Déclencher un pipeline dans un autre projet
deploy-infrastructure:
  stage: deploy
  trigger:
    project: devops/infrastructure
    branch: main
    strategy: depend
  variables:
    APP_VERSION: \\\$CI_COMMIT_TAG
    ENVIRONMENT: production

# Dans le projet infrastructure
# Le pipeline reçoit les variables et déploie

# Downstream avec attente
trigger-e2e-tests:
  stage: test
  trigger:
    project: qa/e2e-tests
    strategy: depend
  variables:
    TARGET_URL: "https://staging.company.com"
    APP_COMMIT: \\\$CI_COMMIT_SHA
\`\`\`

## 4. Dynamic Pipelines

\`\`\`yaml
# Générer dynamiquement le pipeline selon les changements
generate-pipeline:
  stage: .pre
  image: python:3.11-alpine
  script:
    - |
      python3 << 'EOF'
      import json, subprocess, yaml

      # Détecter les services modifiés
      result = subprocess.run(
          ['git', 'diff', '--name-only', 'origin/main...HEAD'],
          capture_output=True, text=True
      )
      changed_files = result.stdout.strip().split('\\n')

      services = set()
      for f in changed_files:
          parts = f.split('/')
          if len(parts) > 1 and parts[0] == 'services':
              services.add(parts[1])

      # Générer le pipeline
      pipeline = {'stages': ['build', 'test', 'deploy']}
      for service in services:
          pipeline[f'build-{service}'] = {
              'stage': 'build',
              'script': [f'cd services/{service} && docker build -t {service} .'],
              'rules': [{'when': 'always'}]
          }
          pipeline[f'test-{service}'] = {
              'stage': 'test',
              'script': [f'cd services/{service} && npm test'],
              'needs': [f'build-{service}']
          }

      with open('dynamic-pipeline.yml', 'w') as f:
          yaml.dump(pipeline, f)
      EOF
  artifacts:
    paths:
      - dynamic-pipeline.yml

run-dynamic:
  stage: .pre
  needs: [generate-pipeline]
  trigger:
    include:
      - artifact: dynamic-pipeline.yml
        job: generate-pipeline
    strategy: depend
\`\`\`

## 5. Merge Trains

Les merge trains garantissent que main reste toujours vert :

\`\`\`yaml
# Configuration dans .gitlab-ci.yml
# Settings > General > Merge requests > Merge trains

# Le merge train :
# 1. Prend les MR approuvées dans l'ordre
# 2. Rebase chaque MR sur le résultat des MR précédentes
# 3. Exécute le pipeline sur le résultat combiné
# 4. Merge seulement si le pipeline passe

# Exemple de configuration
workflow:
  rules:
    - if: \\\$CI_MERGE_REQUEST_IID
    - if: \\\$CI_COMMIT_BRANCH == \\\$CI_DEFAULT_BRANCH

build:
  stage: build
  script: make build
  rules:
    - if: \\\$CI_MERGE_REQUEST_IID

test:
  stage: test
  script: make test
  rules:
    - if: \\\$CI_MERGE_REQUEST_IID
  parallel:
    matrix:
      - SUITE: [unit, integration, e2e]

# Optimisation : jobs légers pour le merge train
.merge_train_rules:
  rules:
    - if: \\\$CI_MERGE_REQUEST_EVENT_TYPE == "merge_train"

fast-check:
  extends: .merge_train_rules
  script: make lint && make test-unit
\`\`\`

## 6. Patterns avancés

\`\`\`yaml
# DAG (Directed Acyclic Graph) avec needs
stages:
  - build
  - test
  - deploy

build-api:
  stage: build
  script: docker build -t api .
  artifacts:
    paths: [api.tar]

build-frontend:
  stage: build
  script: npm run build
  artifacts:
    paths: [dist/]

test-api:
  stage: test
  needs: [build-api]  # N'attend pas build-frontend
  script: npm test

test-frontend:
  stage: test
  needs: [build-frontend]
  script: npx cypress run

deploy:
  stage: deploy
  needs: [test-api, test-frontend]
  script: kubectl apply -f k8s/
  environment:
    name: production
  when: manual

# Resource group pour sérialiser les déploiements
deploy-prod:
  resource_group: production
  script: helm upgrade --install myapp ./chart
\`\`\``,
    practiceContent: `# Exercices pratiques - Pipelines avancés

## Exercice 1 : Pipeline parent-child

\`\`\`yaml
# Parent déclenche des enfants selon les changements
trigger-service-a:
  trigger:
    include: services/a/.gitlab-ci.yml
  rules:
    - changes: [services/a/**]
\`\`\`

## Exercice 2 : Pipeline dynamique

Créez un script qui génère dynamiquement les jobs selon les services modifiés dans un monorepo.

## Exercice 3 : Multi-project trigger

\`\`\`yaml
deploy:
  trigger:
    project: ops/deploy
    branch: main
  variables:
    VERSION: \\\$CI_COMMIT_TAG
\`\`\`

## Exercice 4 : Optimiser avec DAG et needs

Refactorez un pipeline séquentiel en DAG pour paralléliser au maximum.`,
    keyPoints: JSON.stringify(['Les pipelines parent-child modularisent les monorepos en sous-pipelines indépendants', 'Les triggers multi-project orchestrent les dépendances entre repositories', 'Les pipelines dynamiques génèrent la configuration YAML à la volée selon le contexte', 'Les merge trains garantissent que la branche principale reste toujours en état vert', 'Le DAG avec needs permet l\'exécution parallèle sans attendre les jobs non dépendants', 'strategy: depend fait attendre le pipeline parent jusqu\'à la fin du child', 'Les resource groups sérialisent les déploiements pour éviter les conflits', 'rules: changes: déclenche les jobs uniquement quand les fichiers concernés changent']),
  },


  // ============================================================
  // GIT AVANCÉ - Module 4: Git pour les monorepos
  // ============================================================
  {
    id: 'git-04',
    courseId: 'git-avance',
    title: 'Git pour les monorepos',
    duration: '3h',
    orderIndex: 4,
    theoryContent: `# Git pour les Monorepos

## 1. Introduction

Un **monorepo** regroupe plusieurs projets, services ou packages dans un seul dépôt Git. Des organisations comme Google, Facebook, Microsoft et Uber utilisent des monorepos massifs. Git offre des outils pour gérer efficacement ces grands dépôts : sparse-checkout, filter-repo, worktrees et optimisations de performance.

Avantages des monorepos :
- Refactoring atomique cross-projets
- Partage de code facilité
- CI/CD unifiée
- Visibilité globale

Défis :
- Taille du dépôt (historique, fichiers)
- Temps de clone et checkout
- Permissions granulaires
- CI/CD sélective

## 2. Sparse Checkout

Le sparse-checkout permet de ne checkout qu'un sous-ensemble de fichiers :

\`\`\`bash
# Clone partiel (depuis Git 2.25+)
git clone --filter=blob:none --sparse https://github.com/company/monorepo.git
cd monorepo

# Activer le cone mode (plus rapide)
git sparse-checkout init --cone

# Ajouter des répertoires
git sparse-checkout add services/api
git sparse-checkout add libs/shared
git sparse-checkout add infrastructure/terraform

# Voir la configuration
git sparse-checkout list

# Modifier la configuration
git sparse-checkout set services/api services/frontend libs/

# Désactiver (tout checkout)
git sparse-checkout disable
\`\`\`

\`\`\`bash
# Clone partiel avec filtre (partial clone)
# Ne télécharge que les métadonnées, les blobs sont fetch à la demande
git clone --filter=blob:none https://github.com/company/monorepo.git

# Clone avec filtre de taille
git clone --filter=blob:limit=1m https://github.com/company/monorepo.git

# Clone sans arbre (treeless clone) - encore plus léger
git clone --filter=tree:0 https://github.com/company/monorepo.git
\`\`\`

## 3. git-filter-repo

git-filter-repo remplace filter-branch pour réécrire l'historique :

\`\`\`bash
# Installer
pip install git-filter-repo

# Extraire un sous-répertoire en nouveau repo
git filter-repo --subdirectory-filter services/api

# Garder seulement certains chemins
git filter-repo --path services/api --path libs/shared --path package.json

# Supprimer des fichiers volumineux de l'historique
git filter-repo --strip-blobs-bigger-than 10M

# Supprimer un fichier sensible
git filter-repo --invert-paths --path secrets.env

# Renommer des chemins
git filter-repo --path-rename 'old-name/:new-name/'

# Analyser la taille du repo
git filter-repo --analyze
cat .git/filter-repo/analysis/blob-shas-and-paths.txt | head -20
\`\`\`

## 4. Git Worktrees

Les worktrees permettent d'avoir plusieurs branches checkoutées simultanément :

\`\`\`bash
# Créer un worktree pour une branche
git worktree add ../monorepo-feature-branch feature/new-api
git worktree add ../monorepo-hotfix hotfix/critical-bug

# Lister les worktrees
git worktree list

# Travailler dans un worktree
cd ../monorepo-feature-branch
git status
# Travail normal...
git commit -m "feat: add new endpoint"

# Supprimer un worktree
git worktree remove ../monorepo-feature-branch

# Worktree depuis un point spécifique
git worktree add ../release-branch -b release/2.0 origin/main
\`\`\`

Cas d'usage pour les monorepos :
- Travailler sur plusieurs services simultanément
- Reviewer une PR sans perdre son travail en cours
- Builds parallèles sur différentes branches

## 5. Optimisations de performance

\`\`\`bash
# Maintenance programmée
git maintenance start
# Configure un cron qui exécute :
# - prefetch : télécharge les objets en avance
# - commit-graph : optimise la traversée de commits
# - loose-objects : compacte les objets loose
# - incremental-repack : repack incrémental

# Commit graph (accélère log, merge-base, etc.)
git commit-graph write --reachable --changed-paths

# Multi-pack index
git multi-pack-index write
git multi-pack-index verify

# Configuration pour grands repos
git config core.fsmonitor true          # Watchman/FSMonitor
git config core.untrackedCache true     # Cache des fichiers non suivis
git config fetch.parallel 4             # Fetch parallèle
git config pack.threads 4               # Pack parallèle
git config feature.manyFiles true       # Optimisations grands repos

# Filesystem monitor (accélère git status)
git config core.fsmonitor rs-git-fsmonitor
\`\`\`

## 6. Stratégies de CI/CD pour monorepos

\`\`\`bash
# Détecter les services impactés
CHANGED_SERVICES=\\\$(git diff --name-only origin/main...HEAD | \\
  grep -oP 'services/\\K[^/]+' | sort -u)

# Script CI : ne builder que ce qui a changé
for service in \\\$CHANGED_SERVICES; do
  echo "Building \\\$service..."
  cd services/\\\$service
  docker build -t \\\$service:\\\$CI_COMMIT_SHA .
  cd ../..
done

# Avec les affected targets (Nx, Turborepo)
npx nx affected --target=build --base=origin/main
npx nx affected --target=test --base=origin/main
\`\`\``,
    practiceContent: `# Exercices pratiques - Monorepos

## Exercice 1 : Sparse checkout

\`\`\`bash
# Clonez un grand repo en sparse
git clone --filter=blob:none --sparse https://github.com/example/monorepo.git
cd monorepo
git sparse-checkout add services/api libs/common
ls  # Seuls les répertoires sélectionnés sont présents
\`\`\`

## Exercice 2 : Extraire un service

\`\`\`bash
# Extraire un service en nouveau repo avec son historique
git clone monorepo extracted-service
cd extracted-service
git filter-repo --subdirectory-filter services/api
\`\`\`

## Exercice 3 : Worktrees multiples

\`\`\`bash
git worktree add ../feature-a feature/service-a
git worktree add ../feature-b feature/service-b
# Travaillez sur les deux simultanément
git worktree list
\`\`\`

## Exercice 4 : Optimiser les performances

\`\`\`bash
git maintenance start
git config core.fsmonitor true
git config feature.manyFiles true
git commit-graph write --reachable --changed-paths
\`\`\``,
    keyPoints: JSON.stringify(['Le sparse-checkout permet de ne télécharger qu\'un sous-ensemble du monorepo', 'Le partial clone (--filter=blob:none) ne charge les fichiers qu\'à la demande', 'git-filter-repo extrait ou nettoie l\'historique plus efficacement que filter-branch', 'Les worktrees permettent de travailler sur plusieurs branches simultanément', 'git maintenance automatise les optimisations (commit-graph, repack, prefetch)', 'Le FSMonitor accélère drastiquement git status dans les grands répertoires', 'La CI/CD sélective ne build que les services impactés par les changements', 'Nx et Turborepo ajoutent le cache et la détection d\'impact pour les monorepos JS/TS']),
  },

  // ============================================================
  // GIT AVANCÉ - Module 5: Git internals
  // ============================================================
  {
    id: 'git-05',
    courseId: 'git-avance',
    title: 'Git internals',
    duration: '3h',
    orderIndex: 5,
    theoryContent: `# Git Internals

## 1. Introduction

Comprendre les **mécanismes internes** de Git permet de déboguer les situations complexes, d'optimiser les performances et de maîtriser les opérations avancées. Git est fondamentalement un système de stockage adressé par contenu avec une couche de porcelaine (commandes utilisateur) au-dessus de la plomberie.

## 2. Les objets Git

Git stocke 4 types d'objets, tous identifiés par leur hash SHA-1 :

\`\`\`bash
# Les 4 types d'objets
# 1. blob - contenu d'un fichier
# 2. tree - arborescence (répertoire)
# 3. commit - snapshot + métadonnées
# 4. tag - référence annotée vers un commit

# Examiner un objet
git cat-file -t HEAD        # Type : commit
git cat-file -p HEAD        # Contenu du commit
git cat-file -p HEAD^{tree} # Arbre du commit

# Structure d'un commit
tree 4b825dc642cb6eb9a060e54bf899d69f7b0fbd8f
parent a1b2c3d4e5f6789012345678901234567890abcd
author John Doe <john@company.com> 1705312000 +0100
committer John Doe <john@company.com> 1705312000 +0100

feat: implement user authentication

# Créer un objet manuellement
echo "Hello Git Internals" | git hash-object -w --stdin
# Résultat : SHA-1 de l'objet blob créé

# Lire un objet
git cat-file -p <sha1>
\`\`\`

## 3. Packfiles

Git compresse les objets en packfiles pour économiser l'espace :

\`\`\`bash
# Voir les packfiles
ls .git/objects/pack/
# pack-abc123.idx  (index)
# pack-abc123.pack (données)

# Vérifier l'intégrité
git verify-pack -v .git/objects/pack/pack-*.idx

# Statistiques des objets
git count-objects -v -H
# count: 42 (objets loose)
# size: 168.00 KiB
# in-pack: 15234
# packs: 3
# size-pack: 45.20 MiB

# Forcer le repack
git repack -a -d -f --depth=250 --window=250

# Repack incrémental
git repack -d

# Multi-pack index (Git 2.34+)
git multi-pack-index write
git multi-pack-index repack --batch-size=500m
\`\`\`

### Algorithme de delta compression

\`\`\`
Git stocke les fichiers similaires en delta :
- Version 1 du fichier : stocké complet (base)
- Version 2 : stocké comme delta (différences) par rapport à V1
- Économie : 95%+ pour les petites modifications

Le window/depth contrôle l'agressivité de la compression :
- window : nombre d'objets comparés pour trouver des deltas
- depth : profondeur maximale de chaîne de deltas
\`\`\`

## 4. Refs (références)

\`\`\`bash
# Structure des refs
.git/refs/
├── heads/          # Branches locales
│   ├── main
│   └── feature/x
├── remotes/        # Branches distantes
│   └── origin/
│       ├── main
│       └── feature/x
├── tags/           # Tags
│   ├── v1.0.0
│   └── v2.0.0
└── stash           # Stash

# Contenu d'une ref (juste un SHA-1)
cat .git/refs/heads/main
# a1b2c3d4e5f6789012345678901234567890abcd

# HEAD est un pointeur symbolique
cat .git/HEAD
# ref: refs/heads/main

# Packed refs (optimisation)
cat .git/packed-refs
# a1b2c3... refs/remotes/origin/main
# b2c3d4... refs/tags/v1.0.0

# Reflog (historique des modifications de refs)
git reflog show main
git reflog show HEAD
# Chaque entrée : SHA, action, message, timestamp
# Utile pour récupérer des commits "perdus"

# Récupérer un commit après reset --hard
git reflog
git reset --hard HEAD@{3}
\`\`\`

## 5. Transfer Protocols

\`\`\`bash
# Protocoles de transfert Git
# 1. Smart HTTP (recommandé)
#    https://github.com/user/repo.git
#    Supporte : authentification, compression, smart negotiation

# 2. SSH
#    git@github.com:user/repo.git
#    Supporte : authentification par clé, compression

# 3. Git protocol (git://)
#    Pas d'authentification, lecture seule
#    Rarement utilisé

# Déboguer les transferts
GIT_TRACE=1 git fetch
GIT_CURL_VERBOSE=1 git push

# Négociation de packs
# Le client envoie ses "have" (commits déjà présents)
# Le serveur calcule les "want" manquants
# Seuls les objets manquants sont transférés

# Bundle (transfert offline)
git bundle create repo.bundle main
git bundle verify repo.bundle
git clone repo.bundle
\`\`\`

## 6. Maintenance et optimisation

\`\`\`bash
# git fsck - vérifier l'intégrité
git fsck --full --strict
git fsck --unreachable  # Objets orphelins

# git gc - garbage collection
git gc --aggressive --prune=now
git gc --auto  # Exécuté automatiquement par Git

# Commit-graph (accélère la traversée)
git commit-graph write --reachable --changed-paths
git log --oneline  # Beaucoup plus rapide avec le commit-graph

# Bitmap index (accélère clone/fetch)
git repack -a -d --write-bitmap-index

# Replace objects (corriger un commit sans réécrire)
git replace <wrong-commit> <correct-commit>

# Shallow clone et deepening
git clone --depth=1 https://github.com/user/repo.git
git fetch --deepen=10
git fetch --unshallow  # Récupérer tout l'historique
\`\`\``,
    practiceContent: `# Exercices pratiques - Git Internals

## Exercice 1 : Explorer les objets

\`\`\`bash
# Examinez la structure interne
git cat-file -p HEAD
git cat-file -p HEAD^{tree}
git ls-tree -r HEAD | head -10

# Créez un objet manuellement
echo "test content" | git hash-object -w --stdin
\`\`\`

## Exercice 2 : Analyser les packfiles

\`\`\`bash
git count-objects -v -H
git verify-pack -v .git/objects/pack/*.idx | sort -k3 -n -r | head -10
# Identifier les plus gros objets
\`\`\`

## Exercice 3 : Récupérer avec le reflog

\`\`\`bash
# Simuler une perte
git reset --hard HEAD~3
# Récupérer
git reflog
git reset --hard HEAD@{1}
\`\`\`

## Exercice 4 : Optimiser un dépôt

\`\`\`bash
git gc --aggressive
git commit-graph write --reachable --changed-paths
git repack -a -d --write-bitmap-index
git count-objects -v -H  # Comparer avant/après
\`\`\``,
    keyPoints: JSON.stringify(['Git stocke 4 types d\'objets : blob, tree, commit et tag, tous adressés par SHA-1', 'Les packfiles compriment les objets similaires en deltas pour économiser l\'espace', 'Les refs sont de simples fichiers contenant un hash SHA-1 pointant vers un commit', 'Le reflog conserve l\'historique de toutes les modifications de HEAD et des branches', 'Les transfer protocols négocient les objets manquants pour minimiser le transfert', 'git fsck vérifie l\'intégrité de tous les objets et détecte les corruptions', 'Le commit-graph et les bitmap indexes accélèrent drastiquement les opérations de traversée', 'git gc compacte les objets loose en packfiles et supprime les objets inaccessibles']),
  },


  // ============================================================
  // JENKINS - Module 5: Jenkins et Kubernetes
  // ============================================================
  {
    id: 'jen-05',
    courseId: 'jenkins',
    title: 'Jenkins et Kubernetes',
    duration: '3h',
    orderIndex: 5,
    theoryContent: `# Jenkins et Kubernetes

## 1. Introduction

L'intégration de Jenkins avec Kubernetes offre des capacités puissantes : agents dynamiques (pods éphémères), construction d'images avec Kaniko, déploiement Helm et scaling automatique. Le plugin Kubernetes permet à Jenkins de provisionner des agents à la demande dans un cluster K8s.

Avantages :
- Agents éphémères : pas de maintenance, isolation totale
- Scaling automatique selon la charge
- Environnements de build reproductibles via des images Docker
- Pas de conflit entre builds (pods isolés)

## 2. Plugin Kubernetes - Configuration

\`\`\`groovy
// Configuration dans Jenkins (Manage Jenkins > Clouds > Kubernetes)
// URL: https://kubernetes.default.svc
// Namespace: jenkins
// Jenkins URL: http://jenkins.jenkins.svc:8080
// Jenkins tunnel: jenkins-agent.jenkins.svc:50000

// Ou via JCasC (Jenkins Configuration as Code)
// jenkins.yaml
jenkins:
  clouds:
    - kubernetes:
        name: "kubernetes"
        serverUrl: "https://kubernetes.default.svc"
        namespace: "jenkins"
        jenkinsUrl: "http://jenkins:8080"
        jenkinsTunnel: "jenkins-agent:50000"
        containerCapStr: "50"
        maxRequestsPerHostStr: "32"
        retentionTimeout: 5
        connectTimeout: 5
        readTimeout: 15
        templates:
          - name: "default-agent"
            namespace: "jenkins"
            label: "kubernetes"
            containers:
              - name: "jnlp"
                image: "jenkins/inbound-agent:latest"
                workingDir: "/home/jenkins/agent"
                resourceRequestCpu: "200m"
                resourceRequestMemory: "256Mi"
                resourceLimitCpu: "1"
                resourceLimitMemory: "1Gi"
\`\`\`

## 3. Agents Dynamiques dans le Pipeline

\`\`\`groovy
// Jenkinsfile avec agents Kubernetes
pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    app: jenkins-agent
spec:
  containers:
    - name: maven
      image: maven:3.9-eclipse-temurin-17
      command: ['sleep']
      args: ['infinity']
      resources:
        requests:
          memory: "1Gi"
          cpu: "500m"
        limits:
          memory: "2Gi"
          cpu: "2"
      volumeMounts:
        - name: maven-cache
          mountPath: /root/.m2/repository
    - name: docker
      image: docker:24-dind
      securityContext:
        privileged: true
      env:
        - name: DOCKER_TLS_CERTDIR
          value: ""
    - name: kubectl
      image: bitnami/kubectl:1.28
      command: ['sleep']
      args: ['infinity']
  volumes:
    - name: maven-cache
      persistentVolumeClaim:
        claimName: maven-cache-pvc
"""
        }
    }

    stages {
        stage('Build') {
            steps {
                container('maven') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Test') {
            steps {
                container('maven') {
                    sh 'mvn test'
                }
            }
            post {
                always {
                    junit 'target/surefire-reports/*.xml'
                }
            }
        }

        stage('Docker Build') {
            steps {
                container('docker') {
                    sh """
                        docker build -t registry.company.com/myapp:\\\${BUILD_NUMBER} .
                        docker push registry.company.com/myapp:\\\${BUILD_NUMBER}
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                container('kubectl') {
                    sh """
                        kubectl set image deployment/myapp \\
                          myapp=registry.company.com/myapp:\\\${BUILD_NUMBER} \\
                          -n production
                        kubectl rollout status deployment/myapp -n production --timeout=300s
                    """
                }
            }
        }
    }
}
\`\`\`

## 4. Kaniko - Build d'images sans Docker-in-Docker

Kaniko permet de construire des images Docker sans privilèges :

\`\`\`groovy
pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: kaniko
      image: gcr.io/kaniko-project/executor:debug
      command: ['sleep']
      args: ['infinity']
      volumeMounts:
        - name: docker-config
          mountPath: /kaniko/.docker
  volumes:
    - name: docker-config
      secret:
        secretName: registry-credentials
        items:
          - key: .dockerconfigjson
            path: config.json
"""
        }
    }

    stages {
        stage('Build and Push') {
            steps {
                container('kaniko') {
                    sh """
                        /kaniko/executor \\
                          --dockerfile=Dockerfile \\
                          --context=dir://\\\${WORKSPACE} \\
                          --destination=registry.company.com/myapp:\\\${BUILD_NUMBER} \\
                          --destination=registry.company.com/myapp:latest \\
                          --cache=true \\
                          --cache-repo=registry.company.com/myapp/cache \\
                          --snapshotMode=redo \\
                          --use-new-run
                    """
                }
            }
        }
    }
}
\`\`\`

## 5. Déploiement Helm depuis Jenkins

\`\`\`groovy
pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
spec:
  serviceAccountName: jenkins-deployer
  containers:
    - name: helm
      image: alpine/helm:3.14
      command: ['sleep']
      args: ['infinity']
"""
        }
    }

    environment {
        APP_VERSION = "\\\${BUILD_NUMBER}"
        NAMESPACE = "production"
    }

    stages {
        stage('Helm Lint') {
            steps {
                container('helm') {
                    sh 'helm lint charts/myapp'
                }
            }
        }

        stage('Helm Deploy') {
            steps {
                container('helm') {
                    sh """
                        helm upgrade --install myapp charts/myapp \\
                          --namespace \\\${NAMESPACE} \\
                          --set image.tag=\\\${APP_VERSION} \\
                          --set ingress.host=api.company.com \\
                          --values charts/myapp/values-production.yaml \\
                          --wait \\
                          --timeout 5m \\
                          --atomic
                    """
                }
            }
        }

        stage('Verify') {
            steps {
                container('helm') {
                    sh """
                        helm status myapp -n \\\${NAMESPACE}
                        helm test myapp -n \\\${NAMESPACE} --logs
                    """
                }
            }
        }
    }

    post {
        failure {
            container('helm') {
                sh "helm rollback myapp -n \\\${NAMESPACE}"
            }
        }
    }
}
\`\`\`

## 6. Scaling et performance

\`\`\`yaml
# Configuration avancée du cloud Kubernetes
# Limiter les pods par noeud
# Utiliser des node selectors pour les agents
# PodTemplate avec affinité

apiVersion: v1
kind: Pod
spec:
  nodeSelector:
    node-role: ci-agents
  tolerations:
    - key: "dedicated"
      operator: "Equal"
      value: "ci"
      effect: "NoSchedule"
  affinity:
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: 100
          podAffinityTerm:
            labelSelector:
              matchExpressions:
                - key: jenkins/agent
                  operator: Exists
            topologyKey: kubernetes.io/hostname
\`\`\`

\`\`\`groovy
// Shared library pour simplifier l'usage
// vars/k8sPipeline.groovy
def call(Map config) {
    pipeline {
        agent {
            kubernetes {
                yaml podTemplate(config.containers)
            }
        }
        stages {
            stage('Build') {
                steps { container(config.buildContainer) { sh config.buildCmd } }
            }
            stage('Deploy') {
                steps { container('helm') { sh "helm upgrade --install ..." } }
            }
        }
    }
}
\`\`\``,
    practiceContent: `# Exercices pratiques - Jenkins et Kubernetes

## Exercice 1 : Agent Kubernetes basique

\`\`\`groovy
pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: node
      image: node:18
      command: ['sleep']
      args: ['infinity']
"""
        }
    }
    stages {
        stage('Build') {
            steps {
                container('node') {
                    sh 'node --version && npm --version'
                }
            }
        }
    }
}
\`\`\`

## Exercice 2 : Build avec Kaniko

Configurez un pipeline qui build et push une image sans Docker-in-Docker.

## Exercice 3 : Déploiement Helm avec rollback

\`\`\`groovy
stage('Deploy') {
    steps {
        container('helm') {
            sh 'helm upgrade --install myapp ./chart --atomic --timeout 5m'
        }
    }
}
\`\`\`

## Exercice 4 : Pipeline multi-container

Créez un pipeline avec :
- Container Maven (build)
- Container Kaniko (image)
- Container Helm (deploy)
- Container kubectl (verify)`,
    keyPoints: JSON.stringify(['Le plugin Kubernetes provisionne des agents Jenkins comme des pods éphémères à la demande', 'Chaque build s\'exécute dans un pod isolé avec les containers nécessaires', 'Kaniko construit des images Docker sans privilèges ni Docker daemon', 'Le cache Kaniko (--cache-repo) accélère les builds en réutilisant les couches', 'Helm avec --atomic rollback automatiquement en cas d\'échec de déploiement', 'Les PVC partagés (maven-cache, npm-cache) accélèrent les builds entre exécutions', 'Le serviceAccountName contrôle les permissions RBAC de l\'agent dans le cluster', 'Les nodeSelector et tolerations dirigent les agents vers des noeuds dédiés au CI']),
  },
];
