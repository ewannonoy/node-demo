CREATE TABLE lead_services (
  lead_id INT NOT NULL,
  service_id INT NOT NULL,
  PRIMARY KEY (lead_id, service_id),
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);
