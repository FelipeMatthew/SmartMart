package entity

import "errors"

type OrderRequest struct {
	OrderID  string  `json:"order_id"`
	CardHash string  `json:"card_hash"`
	Total    float64 `json:"total"`
}

type OrderResponse struct {
	OrderID string `json:"order_id"`
	Status  string `json:"status"` // Paid , Pending, Failed
}

func NewOrderRequest(orderID, cardHash string, total float64) *OrderRequest {
	return &OrderRequest{
		OrderID:  orderID,
		CardHash: cardHash,
		Total:    total,
	}
}

func NewOrderResponse(orderID string, status string) *OrderResponse {
	return &OrderResponse{
		OrderID: orderID,
		Status:  status,
	}
}

func (o *OrderRequest) Validate() error {
	if o.OrderID == "" {
		return errors.New("order id is required")
	}

	if o.CardHash == "" {
		return errors.New("card  hash is is required")
	}

	if o.Total <= 0 {
		return errors.New("total mus be greater than 0")
	}
	return nil
}

func (o *OrderRequest) Process() (*OrderResponse, error) {
	if err := o.Validate(); err != nil {
		return nil, err
	}
	orderResponse := NewOrderResponse(o.OrderID, "Failed")
	if o.Total < 100.00 {
		orderResponse.Status = "Paid"
	}
	return orderResponse, nil
}
