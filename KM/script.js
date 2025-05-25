let orders = [
  { table: 1, items: ["1 Chicken Noodles", "1 Paneer Tikka"], status: "ordered" },
  { table: 2, items: ["2 Chicken Biryani", "2 Naan"], status: "preparing" },
  { table: 3, items: ["1 Veg Burger", "1 Fries"], status: "prepared" },
  { table: 4, items: ["1 Pizza", "2 Cokes"], status: "ordered" },
  { table: 5, items: ["1 Grilled Sandwich"], status: "preparing" },
  { table: 6, items: ["1 Chocolate Cake"], status: "prepared" }
];

const sortOrder = {
  ordered: 1,
  prepared: 2,
  preparing: 3,
  taken: 4,
  declined: 5
};

function renderOrders() {
  const container = document.getElementById("orders");
  container.innerHTML = "";

  orders = orders.filter(order => order.status !== "taken");

  const sorted = [...orders].sort((a, b) => sortOrder[a.status] - sortOrder[b.status]);

  sorted.forEach(order => {
    const card = document.createElement("div");
    card.className = "order-card";
    card.dataset.status = order.status;

    const header = document.createElement("div");
    header.className = "order-header";
    header.innerHTML = `<strong>Table ${order.table}</strong><em>${order.status}</em>`;

    const itemsList = document.createElement("ul");
    itemsList.className = "order-items";
    order.items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      itemsList.appendChild(li);
    });

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "buttons";

    if (order.status === "ordered") {
      buttonGroup.append(
        createButton("Accept", "accept", () => updateStatus(order.table, "preparing")),
        createButton("Decline", "decline", () => updateStatus(order.table, "declined"))
      );
    } else if (order.status === "preparing") {
      buttonGroup.append(createButton("Prepared", "ready", () => updateStatus(order.table, "prepared")));
    } else if (order.status === "prepared") {
      buttonGroup.append(createButton("Taken", "take", () => updateStatus(order.table, "taken")));
    }

    card.append(header, itemsList, buttonGroup);
    container.appendChild(card);
  });
}

function createButton(text, className, handler) {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.className = className;
  btn.onclick = handler;
  return btn;
}

function updateStatus(table, newStatus) {
  const order = orders.find(o => o.table === table);
  if (order) order.status = newStatus;
  renderOrders();
}

renderOrders();
