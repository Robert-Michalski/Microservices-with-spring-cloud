package com.rob.orderservice.event;

import lombok.Builder;

@Builder
public record OrderPlacedEvent(long orderId) {
}
