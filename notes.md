docker run --name rabbitmq -p 5672:5672 rabbitmq

You have to let the server acknowledge that you can consumed the data for the data to be dequeued.

# Thoughts from External Sources on RabbitMQ
- Too many abstractions
- Complex - Doesn't usually scale with humans, slow adoption
- Push model - Server pushes data onto consumers instead of consumers constantly polling. Doesn't scale - How do you guarantee that the consumer will receive that message? How do you avoid overwhelming them?